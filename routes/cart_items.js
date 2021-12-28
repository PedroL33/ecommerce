const router = require('express').Router();
const cartItemController = require('../controllers/cartItemController');

router.put('/', cartItemController.updateCartItem);

router.delete('/', cartItemController.deleteCartItem);

router.post('/', cartItemController.createCartItem);

module.exports = router;