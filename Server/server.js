// const express = require('express');
// const app = express();
// const path = require('path');
// const PORT = 3000;


// // parses JSON from incoming request
// app.use(express.json());

// // "start": "webpack serve"

// //get request to /colors including status code of 200

// //404 error handler when incorrect path is placed
// app.get('/*', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '../index.html'));
// })

// // Global error handling middleware
// // How can we trigger this to run?
// app.use((err, req, res, next) => {
//     const defaultErr = {
//         log: 'Express error handler caught unknown middleware error',
//         status: 500,
//         message: { err: 'An error occurred' },
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     return res.status(errorObj.status).json(errorObj.message);
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on port: ${PORT}...`);
// });
