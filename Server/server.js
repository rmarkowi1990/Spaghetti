const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const userController = require('./Controllers/userController.jsx')


// multer to help pass data types thru express + config
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

upload.single('image')



//random number generator imports + config
const dotenv = require('dotenv');
const crypto = require('crypto')
const { promisify } = require('util')

dotenv.config()
const randomBytes = promisify(crypto.randomBytes)


//s3 imports + config
const aws = require('aws-sdk');
const { S3Client, PutObjectAclCommand, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const region = 'us-west-1';
const bucketName = 'rmarkowi1990';

const s3 = new S3Client({
    credentials: {
        accessKeyId: 'AKIA42LHJIHYBI4PA7VC',
        secretAccessKey: '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'
    },
    region: region,
})






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

app.post('/login', userController.checkUser, (req, res) => {
    console.log('user details: ', res.locals.userDetails)
    res.status(200).json(res.locals.userDetails)

})

app.post('/photo', upload.single('image'), async (req, res) => {



    //receives image from frontend 
    console.log("req.file : ", req.file);
    console.log('req.body', req.body)

    const { mealTitle, price, expiration, description, dairy, eggs, fish, crustaceans, treeNuts, peanuts, wheat, soybeans, sesame, meat } = req.body


    //generates random title
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    //creates parameters for s3 request
    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    //places image in s3
    const putCommand = new PutObjectCommand(params);
    await s3.send(putCommand)


    // //creates parameters to recieve url
    // const getObjectParams = {
    //     Bucket: bucketName,
    //     Key: imageName

    // }
    // //recieves url from uploaded image via Key (random title)

    // const getCommand = new GetObjectCommand(getObjectParams);
    // const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
    // console.log('url: ', url)
    res.send(imageName)

})

app.post('/storeMeal', (req, res) => {

    console.log('inside store meal:', req.body)
    res.send()



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
