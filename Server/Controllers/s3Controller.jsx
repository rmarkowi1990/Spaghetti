
//random number generator imports + config
const aws = require('aws-sdk');
const { S3Client, PutObjectAclCommand, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const dotenv = require('dotenv');
const crypto = require('crypto')
const { promisify } = require('util')

dotenv.config()
const randomBytes = promisify(crypto.randomBytes)


//s3 imports + config
// const aws = require('aws-sdk');
// const { S3Client, PutObjectAclCommand, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const region = 'us-west-1';
const bucketName = 'rmarkowi1990';

const s3 = new S3Client({
    credentials: {
        accessKeyId: 'AKIA42LHJIHYBI4PA7VC',
        secretAccessKey: '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'
    },
    region: region,
})



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



        // // //creates parameters to recieve url
        // // const getObjectParams = {
        // //     Bucket: bucketName,
        // //     Key: imageName

        // // }
        // // //recieves url from uploaded image via Key (random title)

        // // const getCommand = new GetObjectCommand(getObjectParams);
        // // const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
        // // console.log('url: ', url)
        // res.send(imageName)




        return next()


    } catch (error) {

        return next(error)
    }

}

module.exports = s3Controller