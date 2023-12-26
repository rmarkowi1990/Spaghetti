const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const userController = require('./Controllers/userController.jsx')
const s3Controller = require('./Controllers/s3Controller.jsx')
const mealController = require('./Controllers/mealController.jsx')
const orderController = require('./Controllers/orderController.jsx')




// multer to help pass data types thru express + config
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

upload.single('image')





// parses JSON from incoming request
app.use(express.json());


// cors error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:2000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})



//adds new user to users table
app.post('/signup', userController.createUser, (req, res) => {
    res.status(200).json("user successfully added")

})

app.post('/login',
    userController.checkUser,

    (req, res) => {

        res.status(200).json(res.locals.userDetails)

    })


//adds meal photo to aws and adds entire meal to database
app.post('/meals', upload.single('image'), s3Controller.uploadImage, mealController.addMeal, async (req, res) => {

    res.send('success')

})

//for pulling all of chef's creations on chef page
app.get('/meals/chef/:id', mealController.getMealsByChefID, s3Controller.generateURLs, async (req, res) => {
    res.status(200).send(res.locals.mealsWithURLs)
})

//for viewing a specific meal page
app.get('/meals/meal/:id', mealController.getMealsByID, s3Controller.generateURLs, async (req, res) => {
    res.status(200).send(res.locals.mealsWithURLs)
})

app.get('/meals', mealController.getMeals, s3Controller.generateURLs, (req, res) => {
    res.status(200).send(res.locals.mealsWithURLs)

})

app.post('/storeMeal', (req, res) => {

    console.log('inside store meal:', req.body)
    res.send()



})

app.post('/placeOrder',
    orderController.processOrder,
    mealController.updatePortions,
    mealController.getMeals,
    s3Controller.generateURLs,
    (req, res) => {

        res.status(200).send(res.locals.mealsWithURLs)

    })










//error handling

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});
