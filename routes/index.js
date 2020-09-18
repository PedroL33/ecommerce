const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

/* GET home page. */
router.get('/', function(req, res) {
  res.status(200).json({msg: "Welcome"})
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;
