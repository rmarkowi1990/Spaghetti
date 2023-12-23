const db = require('../Models/databaseModels.jsx');

const orderController = {};

orderController.processOrder = async (req, res, next) => {

    try {

        const { user_id, meal_id, price, date, quantity } = req.body;

        const values = [user_id, meal_id, price, date, quantity]
        const addText = "INSERT INTO orders (user_id, meal_id, price, date, quantity) VALUES ($1, $2, $3, $4, $5)"

        await db.query(addText, values);
        console.log('order placed')

        return next()
    } catch (error) {
        return next(error)
    }
}


module.exports = orderController;