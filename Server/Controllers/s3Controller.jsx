
//random number generator imports + config
const aws = require('aws-sdk');
const { S3Client, PutObjectAclCommand, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require('dotenv');
const crypto = require('crypto')
const { promisify } = require('util')

dotenv.config()
const randomBytes = promisify(crypto.randomBytes)


const region = 'us-west-1';
const bucketName = 'rmarkowi1990';

const s3 = new S3Client({
    credentials: {
        accessKeyId: 'AKIA42LHJIHYBI4PA7VC',
        secretAccessKey: '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'
    },
    region: region,
})

//controllers

const s3Controller = {};

s3Controller.uploadImage = async (req, res, next) => {


    try {

        res.locals.meal = req.body;

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

        res.locals.imageName = imageName;

        return next()


    } catch (error) {

        return next(error)
    }
}



s3Controller.generateURLs = async (req, res, next) => {
    try {

        let mealArray = res.locals.meals;

        let getObjectParams = {
            Bucket: bucketName,
            Key: ''

        };

        let getCommand;
        let url;

        //generate URL for every meal via s3
        for (let meal of mealArray) {

            getObjectParams.Key = meal.imagetitle;

            getCommand = new GetObjectCommand(getObjectParams);
            meal.url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });

        }

        res.locals.mealsWithURLs = mealArray;

        return next()
    } catch (error) {
        return next(error)
    }

}

module.exports = s3Controller