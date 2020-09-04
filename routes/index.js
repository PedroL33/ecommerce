var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).json({msg: "Welcome"})
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;
