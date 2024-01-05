const db = require('../Models/databaseModels.jsx');

const orderController = {};

orderController.processOrder = async (req, res, next) => {

    try {

        const { user_id, meal_id, price, date, quantity, time } = req.body;

        console.log('process order time: ', time)

        console.log('price price: ', price)

        const totalPrice = Number(price.slice(1)) * quantity

        const USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        const totalPriceString = USDollar.format(totalPrice)

        console.log('total price string: ', totalPriceString)


        const values = [user_id, meal_id, totalPriceString, date, quantity, false, false, false, time]
        const addText = "INSERT INTO orders (user_id, meal_id, price, date, quantity, fulfilled, received, reviewed, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"

        await db.query(addText, values);
        console.log('order placed')

        return next()
    } catch (error) {
        return next(error)
    }
}

orderController.orderHistory = async (req, res, next) => {
    try {

        const userId = req.params.id;
        console.log('userID: ', userId)
        const queryText = `SELECT orders.*, meals.mealtitle, meals.chef_id, users.username AS chef_username, users.address AS chef_address, users.city AS chef_city, users.state AS chef_state, users.zip AS chef_zip, users.chefrating AS chef_rating FROM meals LEFT OUTER JOIN orders ON meals.meal_id = orders.meal_id LEFT OUTER JOIN users ON meals.chef_id = users.id WHERE user_id =${userId}`;
        const returned = await db.query(queryText);
        console.log('returned: ', returned.rows)
        res.locals.returned = returned.rows;


        return next()
    } catch (error) {
        return next(error)
    }
}

orderController.markReceieved = async (req, res, next) => {
    try {
        const id = req.params.id;
        const text = `UPDATE orders SET received = true WHERE order_id = ${id}`;
        await db.query(text)
        console.log('order ' + id + ' recieved: true')


        return next()
    } catch (error) {
        return next(error)
    }



}

orderController.markFulfilled = async (req, res, next) => {
    try {
        const orderId = req.params.orderid;
        await db.query(`UPDATE orders SET fulfilled = true WHERE order_id = ${orderId}`)
        return next()

    } catch (error) {
        return next(error)
    }
}

orderController.getOrdersByChef = async (req, res, next) => {
    try {


        const chefId = req.params.chefid
        const returned = await db.query(`SELECT meals.chef_id, orders.order_id, orders.time, orders.user_id, orders.meal_id, orders.date, orders.price, orders.quantity, orders.fulfilled, orders.received, meals.meal_id, meals.mealtitle,  users.id, users.username AS eater_username, users.firstname AS eater_firstname, users.patronrating FROM orders LEFT OUTER JOIN meals ON orders.meal_id = meals.meal_id LEFT OUTER JOIN users ON orders.user_id = users.id WHERE meals.chef_id = ${chefId}`)
        res.locals.returned = returned.rows
        return next()
    }
    catch (error) {
        return next(error)
    }
}

orderController.updateReviewed = async (req, res, next) => {
    try {
        const { order_id } = req.body;
        await db.query(`UPDATE orders SET reviewed = true WHERE order_id = ${order_id}`)
        return next()
    } catch (error) {
        return next(error)
    }
}

module.exports = orderController;