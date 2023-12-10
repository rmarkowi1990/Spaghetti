const db = require('../Models/databaseModels.jsx');


const userController = {};


//add user to database
userController.createUser = async (req, res, next) => {

    try {

        const submitted = req.body;
        const values = [submitted.userName, submitted.password, submitted.firstName, submitted.lastName, submitted.address, submitted.city, submitted.state, submitted.zip];
        const text = "INSERT INTO users (userName, password, firstName, lastName, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

        await db.query(text, values);
        return next()

    } catch (error) {
        return next(error)
    }


}

module.exports = userController;