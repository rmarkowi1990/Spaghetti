const db = require('../Models/databaseModels.jsx');

const orderController = {};

orderController.processOrder = async (req, res, next) => {

    try {

        const { user_id, meal_id, price, date, quantity } = req.body;

        const values = [user_id, meal_id, price, date, quantity, false, false]
        const addText = "INSERT INTO orders (user_id, meal_id, price, date, quantity, fulfilled, received) VALUES ($1, $2, $3, $4, $5, $6, $7)"

        await db.query(addText, values);
        console.log('order placed')

        return next()
    } catch (error) {
        return next(error)
    }
}

orderController.getReceived = async (req, res, next) => {
    try {

        const userId = req.params.id;
        console.log('userID: ', userId)
        const queryText = `SELECT orders.*, meals.mealtitle, meals.chef_id, meals.price, users.username AS chef_username, users.address AS chef_address, users.state AS chef_state, users.zip AS chef_zip, users.chefrating AS chef_rating FROM meals LEFT OUTER JOIN orders ON meals.meal_id = orders.meal_id LEFT OUTER JOIN users ON meals.chef_id = users.id WHERE user_id =${userId} AND received = TRUE`;
        const returned = await db.query(queryText);
        console.log('returned: ', returned.rows)
        res.locals.returned = returned.rows;


        return next()
    } catch (error) {
        return next(error)
    }
}


module.exports = orderController;