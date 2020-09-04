const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.signup = [
  body('username').isLength({min: 5}).withMessage("Username must be 5 characters long."),
  body('email').isEmail().withMessage("Invalid Email format."),
  body('password').isLength({min: 6}).withMessage("Password must be 6 characters long"), 
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const extractedErrors = []
      errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
      return res.status(400).json({ errors: extractedErrors });
    }
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if(err) return res.status(400).json(err);
      const user = new User({
        name: req.body.username, 
        email: req.body.email,
        password: hash
      })
      user.save((err) => {
        if(err && err.name==="MongoError" && err.code===11000) {
          var param = Object.keys(err["keyValue"])[0];
          const value = err["keyValue"][param]
          return res.status(400).json({
            "errors": [{
                param: `The ${param} ${value} is already in use.`
            }]
          })
        }
        return res.status(200).json({msg: "User created."})
      })
    })
  }
]

exports.login = (req, res) => {
  User.find({name: req.body.username})
  .then((data) => {
    bcrypt.compare(req.body.password, data[0].password, (err, result) => {
      if(result) {
        const token = jwt.sign({username: data[0].name}, process.env.jwtSecretKey);
        return res.status(200).json({
          msg: "Login successful.",
          token: token
        })
      }else {
        return res.status(400).json({
          msg: "Invalid credentials."
        })
      }
    })
  })
}