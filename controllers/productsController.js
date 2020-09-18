const Product = require('../models/products');
const { body, validationResult } = require('express-validator');

exports.allProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if(err) {
      return res.status(400).json({
        error: "Products not found."
      })
    }else {
      return res.status(200).json({
        products
      })
    }
  })
}

exports.addProduct =[
  body('name').isString().withMessage("Name must be a string value.").isLength({min: 3}).withMessage("Must be 3 characters long."),
  body('price').isInt({min: 0}).withMessage("Price must be an integer value."),
  body('description').isString().withMessage("Description must be a string value.").isLength({max: 144}).withMessage("Description cannot exceed 144 characters."),
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

exports.updateProduct = [
  body('field').custom(value => {
    const values = ["category", "name", "price", "description", "quantity"]
    if(!values.includes(value)) {
      throw new Error("Please select a valid category");
    }
    return true;
  }),
  body('change').custom((change, {req}) => {
    if(req.body.field === "category" && !Array.isArray(change)) {
      throw new Error("Category must be an array value.")
    }else if((req.body.field === "name" || req.body.field === "description") && !(typeof change === 'string')) {
      throw new Error(`${req.body.field.toUpperCase()} must be a string value.`)
    }else if((req.body.field === "price" || req.body.field === "quantity") && (!(typeof change === "number") || change % 1 !== 0)) {
      throw new Error(`${req.body.field.toUpperCase()} must be a integer value.`)
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = []
      errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
      return res.status(400).json({ errors: extractedErrors });
    }
    Product.findOne({_id: req.params.id}, (err, product) => {
      if(err) return res.status(400).json({errors: [{_id: "Product not found."}]})
      product[req.body.field] = req.body.change
      product.save((err) => {
        res.status(200).json({
          msg: `Product ${req.params.id} ${req.body.field} changed to ${req.body.change}.`
        })
      })
    })
  }
]