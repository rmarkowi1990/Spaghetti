const { MongoBatchReExecutionError } = require('mongodb');
const db = require('../Models/databaseModels.jsx');





const userController = {};


//add user to database
userController.createUser = async (req, res, next) => {

    try {

        const submitted = req.body;
        const values = [submitted.userName, submitted.password, submitted.firstName, submitted.lastName, submitted.address, submitted.city, submitted.state, submitted.zip];
        const text = "INSERT INTO users (userName, password, firstName, lastName, address, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";

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

        //update to bcrypt.compare
        if (password === match.rows[0].password) {
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





    }
    catch (error) {
        return next(error)

    }
}

userController.getReview = async (req, res, next) => {
    // const { user_id } = req.body
    console.log('inside getReview, req.body is: ', req.body)
    // const review = async db.query()



}

module.exports = userController;