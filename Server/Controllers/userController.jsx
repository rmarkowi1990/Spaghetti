const { MongoBatchReExecutionError } = require('mongodb');
const db = require('../Models/databaseModels.jsx');
const bcrypt = require('bcryptjs')





const userController = {};


//add user to database
userController.createUser = async (req, res, next) => {

    try {

        const submitted = req.body;
        const values = [submitted.userName, submitted.password, submitted.firstName, submitted.lastName, submitted.address, submitted.city, submitted.state, submitted.zip, 0, 0, true];
        const text = "INSERT INTO users (userName, password, firstName, lastName, address, city, state, zip, chefrating, chefratingamount, acceptingorders) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

        await db.query(text, values);
        console.log("after db entry")
        return next()

    } catch (error) {
        console.log("error handling")
        return next({
            log: 'Invalid Username',
            status: 500,
            message: { err: 'username Already Exists' },
        })
    }
}

userController.checkUser = async (req, res, next) => {

    try {
        const { userName, password } = req.body;
        // console.log("username: ", userName)
        const text = `SELECT * FROM users WHERE username = '${userName}'`;
        const match = await db.query(text)

        bcrypt.compare(password, match.rows[0].password, function (err, result) {
            if (result) {
                // console.log('match: ', match.rows[0])
                const userDetails = match.rows[0];
                delete userDetails.password;
                res.locals.userDetails = userDetails;

                return next()
            } else {
                return next({
                    log: 'Invalid Login',
                    status: 400,
                    message: { err: 'Invalid Login' },

                })
            }



        })




        //update to bcrypt.compare






    }
    catch (error) {
        return next(error)

    }
}

userController.updateReview = async (req, res, next) => {
    try {
        const { chef_id, rating } = req.body
        const returned = await db.query(`SELECT * FROM users WHERE id = ${chef_id}`);
        const { chefrating, chefratingamount } = returned.rows[0];
        const updatedAmount = chefratingamount + 1;
        const updatedRating = ((chefrating * chefratingamount) + rating) / updatedAmount;

        await db.query(`UPDATE users SET chefrating = ${updatedRating}, chefratingamount = ${updatedAmount} WHERE id = ${chef_id}`);
        return next()
    }
    catch (error) {
        return next()
    }



}

userController.toggleAcceptingOrders = async (req, res, next) => {
    const { chefID, status } = req.body;
    await db.query(`UPDATE users SET acceptingorders = ${!status} WHERE id = ${chefID}`)


}

userController.getAcceptingOrders = async (req, res, next) => {
    try {

        const returnedStatus = await db.query(`SELECT acceptingorders FROM users WHERE id = ${req.body.chefID}`)
        console.log('returned status, ', returnedStatus.rows[0].acceptingorders)
        res.locals.status = returnedStatus.rows[0].acceptingorders
        return next()
    } catch (error) {
        return next(error)
    }


}

userController.getAcceptingOrdersById = async (req, res, next) => {

    try {
        const returnedStatus = await db.query(`SELECT acceptingorders FROM users WHERE id = ${req.params.chefid}`)
        console.log('getting initial status, ', returnedStatus.rows[0].acceptingorders)
        res.locals.status = returnedStatus.rows[0].acceptingorders
        return next()
    } catch (error) {
        return next(error)
    }


}

module.exports = userController;