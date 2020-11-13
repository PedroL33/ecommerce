const Product = require('../models/products');
const { body, validationResult } = require('express-validator');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
});

const s3 = new AWS.S3();

exports.allProducts = (req, res) => {
  try {
    Product.find({}, (err, products) => {
      if(err) {
        return res.status(400).json({
          error: "Products not found."
        })
      }else {
        return res.status(200).json(
          products
        )
      }
    })
  }catch(err) {
    console.log(err)
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

exports.productById = (req, res) => {
  Product.findById(req.params.id, (err, product) => {
    if(err) {
      res.status(400).json({
        error: "Product could not be found"
      })
    }else {
      res.status(200).json(product);
    }
  })
}

exports.addProduct =[
  body('name').isString().withMessage("Name must be a string value.").isLength({min: 3}).withMessage("Must be 3 characters long."),
  body('price').isInt({min: 0}).withMessage("Price must be an integer value."),
  body('description').isString().withMessage("Description must be a string value.").isLength({max: 1000}).withMessage("Description cannot exceed 1000 characters."),
  body('quantity').isInt({min: 0, max: 5000}).withMessage("Quantity must be an integer value"),
  body('category').isArray().withMessage("Category must be given as an array."),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = []
      errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
      return res.status(400).json({ errors: extractedErrors });
    }
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      category: req.body.category
    })
    product.save((err) => {
      if(err) {
        console.log(err)
        return res.status(400).json({error: "Something went wrong."})
      }
      res.status(200).json({
        msg: `${req.body.name} has been added to the database`
      })
    })
  }
]

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
  console.log(req)
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

// exports.updateProduct = [
//   body('field').custom(value => {
//     const values = ["category", "name", "price", "description", "quantity"]
//     if(!values.includes(value)) {
//       throw new Error("Please select a valid category");
//     }
//     return true;
//   }),
//   body('change').custom((change, {req}) => {
//     if(req.body.field === "category" && !Array.isArray(change)) {
//       throw new Error("Category must be an array value.")
//     }else if((req.body.field === "name" || req.body.field === "description") && !(typeof change === 'string')) {
//       throw new Error(`${req.body.field.toUpperCase()} must be a string value.`)
//     }else if((req.body.field === "price" || req.body.field === "quantity") && (!(typeof change === "number") || change % 1 !== 0)) {
//       throw new Error(`${req.body.field.toUpperCase()} must be a integer value.`)
//     }
//     return true;
//   }),
//   (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       const extractedErrors = []
//       errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
//       return res.status(400).json({ errors: extractedErrors });
//     }
//     Product.findOne({_id: req.params.id}, (err, product) => {
//       if(err) return res.status(400).json({errors: [{_id: "Product not found."}]})
//       product[req.body.field] = req.body.change
//       product.save((err) => {
//         res.status(200).json({
//           msg: `Product ${req.params.id} ${req.body.field} changed to ${req.body.change}.`
//         })
//       })
//     })
//   }
// ]