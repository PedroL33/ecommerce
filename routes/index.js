const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { validate } = require('../middleware/validate');
const validations = require('../middleware/validations');

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).json({msg: "Welcome"})
});

router.post('/signup', validate(validations.userSignup), userController.signup);

router.post('/login', userController.login);

module.exports = router;
