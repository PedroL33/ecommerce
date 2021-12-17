const Product = require('../models/products');
const { body, validationResult } = require('express-validator');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const { db } = require('../database/config');

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const s3 = new AWS.S3();

exports.allProducts = async (req, res) => {
  try {
    const products = await db('products').select('*');
    res.status(200).json(products);
  }catch(err) {
    console.log(err)
    res.status(500).json({err})
  }
}

exports.filterProducts = (req, res) => {
  const querry = req.params.type === "search" ?
  { $or: [{name: {$regex: req.params.value, "$options": "i"}}, {description: {$regex: req.params.value, "$options": "i"}}]} :
  {category: req.params.value};
  Product.find(querry, (err, products) => {
    if(err) {
      return res.status(400).json({
        error: "Something went wrong."
      })
    }else {
      return res.status(200).json(
        products
      )
    }
  })
}

exports.productById = async (req, res) => {
  try {
    const product = await db('products').select('*').where('id', req.params.id).first();
    res.status(200).json(product)
  }catch(err) {
    console.log(err)
    res.status(500).json({err})
  }
}

exports.addProduct = async (req, res) => {
  try {
    const product = await db('products').insert(req.body, "*");
    res.status(200).json(product[0]);
  }catch(err) {
    console.log(err)
    res.status(500).json({err})
  }
}

exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, product) => {
    if(err) return res.status(400).json({error: "Product does not exists"})
    return res.status(200).json({
      msg: `${product.name} has been deleted.`
    })
  })
}

exports.updateProduct = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if(err) {
      res.status(400).json({
        error: err
      })
    }else  {
      product.name = req.body.new_product.name;
      product.category = req.body.new_product.category;
      product.price = req.body.new_product.price;
      product.description = req.body.new_product.description
      product.save((err) => {
        if(err) {
          res.status(400).json(err)
        }else {
          res.status(200).json({msg: `Product ${req.params.id} has been updated.`})
        }
      })
    }
  })
}

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: 'chatbucket11',
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  }
  return s3.upload(params).promise();
}

exports.uploadPhoto = (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if(err) {
      return res.status(500).json(err)
    }
    try {
      const path = files.image[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileType.fromBuffer(buffer);
      const fileName = `bucketFolder/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
      Product.findById(req.params.id, (err, product) => {
        if(err) return res.status(400).json(err)
        product.image = data.Location
        product.save(err => {
          if(err) return res.status(400).json(err)
          return res.status(200).json({
            msg: "Photo uploaded"
          })
        })
      })
    }
    catch(err) {
      return res.status(500).json({
        error: "Something went wrong."
      })
    }
  })
}
