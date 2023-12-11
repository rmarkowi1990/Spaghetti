const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const userController = require('./Controllers/userController.jsx')


// parses JSON from incoming request
app.use(express.json());


//cors error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:2000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})


//adds new user to users table
app.post('/signup', userController.createUser, (req, res) => {
    res.status(200).json("user successfully added")

})

app.post('/login', userController.checkUser, (req, res) => {

    res.status(200).json("user successfully exists")

})

app.post('/meals', (req, res) => {
    //adds new meal to meals table
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
