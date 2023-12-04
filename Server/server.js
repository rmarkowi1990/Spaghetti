const express = require('express');
const app = express();
const path = require('path');
const PORT = 2000;


// parses JSON from incoming request
app.use(express.json());

app.use(() => {

})

// "start": "webpack serve"















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