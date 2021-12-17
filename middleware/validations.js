const { body } = require('express-validator');

exports.createProduct = [
  body('name').isString().withMessage("Name must be a string value.").isLength({min: 5, max: 16}).withMessage("Must be 5-16 characters long."),
  body('price').isInt({min: 0}).withMessage("Price must be a positive value."),
  body('description').isString().withMessage("Description must be a string value.").isLength({max: 1000}).withMessage("Description cannot exceed 1000 characters."),
  body('quantity').isInt({min: 0, max: 5000}).withMessage("Quantity must be an integer value between 0 and 5000"),
  body('category').isString().withMessage("Category must be given as a string.")
]

exports.userSignup = [
  body('username').isLength({min: 5}).withMessage("Username must be a string of length greater than 5."),
  body('email').isEmail().withMessage("Invalid Email format."),
  body('password').isLength({min: 6}).withMessage("Password must be a string of length greater than 6.")
]