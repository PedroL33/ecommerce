const AWS = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const s3 = new AWS.S3();

exports.uploadFile = (file) => {
  const type = file.mimetype.split('/');
  const params = {
    ACL: 'public-read',
    Body: fs.createReadStream(file.path),
    Bucket: process.env.AWSBucket,
    Key: `ecommerce/${file.filename}.${type[type.length-1]}`,
  }
  return s3.upload(params).promise();
}

exports.deleteFile = (filename) => {
  const key = filename.split("amazonaws.com/");
  const params = {
    Bucket: process.env.AWSBucket,
    Key: key[key.length-1],
  }
  return s3.deleteObject(params).promise();
}