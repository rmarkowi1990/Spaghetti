const db = require('../Models/databaseModels.jsx');

const mealController = {};

mealController.addMeal = async (req, res, next) => {

    try {

        const { chefId, mealTitle, price, expiration, description, dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat } = res.locals.meal;
        const imageName = res.locals.imageName;

        const values = [imageName, mealTitle, Number(chefId), price, expiration, description, dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat]
        const addText = "INSERT INTO meals (imagetitle, mealTitle, chef_id, price, expiration, description, dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)"

        await db.query(addText, values);
        console.log('submitted to Database')
        return next(

        )
    } catch (error) {
        return next(error)
    }
}



mealController.getMeals = async (req, res, next) => {

    try {

        const getText = 'SELECT meals.*, users.username AS chef, users.address, users.city, users.state, users.zip, users.chefrating AS rating FROM meals LEFT OUTER JOIN users ON users.id = meals.chef_id';
        const returned = await db.query(getText);
        res.locals.meals = returned.rows

        return next()

    }
    catch (error) {
        return next(error)
    }
}

mealController.getMealsByID = async (req, res, next) => {
    try {
        const id = req.params.id;

        const getText = `SELECT meals.*, users.username AS chef, users.address, users.city, users.state, users.zip, users.chefrating AS rating FROM meals LEFT OUTER JOIN users ON users.id = meals.chef_id WHERE chef_id = ${id}`;
        const returned = await db.query(getText);
        res.locals.meals = returned.rows

        return next()

    }
    catch (error) {
        return next(error)
    }

}



module.exports = mealController;