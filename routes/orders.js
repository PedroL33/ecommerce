const express = require('express');
const router = express.Router();
const auth = require('../middleware/checkAuth');
const orderController = require('../controllers/orderController');

router.get('/', auth.adminAuth, orderController.allOrders);
router.get('/details/:id', auth.adminAuth, orderController.orderDetailsById);
router.get('/items/:id', auth.adminAuth, orderController.orderItemsById);
router.get('/:status', auth.adminAuth, orderController.ordersByStatus);
router.put('/:id', auth.adminAuth, orderController.updateStatus);

module.exports = router;