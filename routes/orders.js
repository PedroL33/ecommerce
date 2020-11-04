const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/checkAuth');

router.get('/', auth.adminAuth, orderController.allOrders);
router.get('/completed', auth.adminAuth, orderController.completedOrders);
router.get('/active', auth.adminAuth, orderController.activeOrders);
router.get('/:id', auth.adminAuth, orderController.orderById);
router.post('/update', auth.adminAuth, orderController.markCompleted);

module.exports = router;