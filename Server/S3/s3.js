const aws = require('aws-sdk');
const dotenv = require('dotenv');
const crypto = require('crypto')
const { promisify } = require('util')

dotenv.config()

const randomBytes = promisify(crypto.randomBytes)

const region = 'us-west-1';
const bucketName = 'rmarkowi1990 ';
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY_IDn

const s3 = new aws.S3({
    region,
    accessKeyId: 'AKIA42LHJIHYBI4PA7VC',
    secretAccessKey: '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',
    signatureVersion: 'v4'
})

const generateImageURL = async () => {

    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString('hex');

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60


    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);

    return uploadURL;

}

module.exports = generateImageURL