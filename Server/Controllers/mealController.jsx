const db = require('../Models/databaseModels.jsx');

const mealController = {};

mealController.addMeal = async (req, res, next) => {

    try {

        const { chefId, mealTitle, price, expiration, description, dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat, portions } = res.locals.meal;
        const imageName = res.locals.imageName;

        const values = [portions, imageName, mealTitle, Number(chefId), price, expiration, description, dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat]
        const addText = "INSERT INTO meals (portions, imagetitle, mealTitle, chef_id, price, expiration, description, dairy, eggs, fish, crustaceans, treenuts, peanuts, wheat, soybeans, sesame, meat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)"

        await db.query(addText, values);
        return next()
    } catch (error) {
        return next(error)
    }
}



mealController.getMeals = async (req, res, next) => {

    try {

        const getText = 'SELECT meals.*, users.username AS chef, users.address, users.city, users.state, users.zip, users.chefrating AS rating FROM meals LEFT OUTER JOIN users ON users.id = meals.chef_id';
        const returned = await db.query(getText);

        const expirationInDays = (returned.rows).map(meal => {

            // determines expiration in days
            const today = new Date();
            const expiration = new Date(meal.expiration)
            const timeMS = expiration.getTime() - today.getTime()
            const days = Math.round(timeMS / (1000 * 3600 * 24));

            //determines discounted price IF any

            let discount = 'none'

            // console.log('meal price: ', Number(meal.price.slice(1)), 'days: ', days)


            if (days === 2) discount = Number(meal.price.slice(1)) * .66
            if (days === 1) discount = Number(meal.price.slice(1)) * .4
            if (days === 0) discount = Number(meal.price.slice(1)) * .2
            if (typeof discount === 'number') discount = '$' + discount.toFixed(2).toString()




            return { ...meal, expiration: days, discount: discount }

        })





        res.locals.meals = expirationInDays

        return next()

    }
    catch (error) {
        return next(error)
    }
}

mealController.getMealsByChefID = async (req, res, next) => {

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

mealController.getMealsByID = async (req, res, next) => {

    try {
        const id = req.params.id;

        const getText = `SELECT meals.*, users.username AS chef, users.address, users.city, users.state, users.zip, users.chefrating AS rating FROM meals LEFT OUTER JOIN users ON users.id = meals.chef_id WHERE meal_id =  ${id}`;
        const returned = await db.query(getText);
        res.locals.meals = returned.rows

        return next()

    }
    catch (error) {
        return next(error)
    }

}

mealController.updatePortions = async (req, res, next) => {
    try {

        const { meal_id, quantity } = req.body;

        //retrieve previous portions from meal
        let portions = await db.query(`SELECT portions FROM meals WHERE meal_id = ${meal_id}`);
        portions = portions.rows[0].portions;


        //modify portions, decremeanting by order
        await db.query(`UPDATE meals SET portions = ${portions - quantity} WHERE meal_id = ${meal_id};`)

        return next()
    } catch (error) {
        return next(error)


    }
}



module.exports = mealController;