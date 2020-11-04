const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/checkAuth');

router.get('/', productsController.allProducts);

router.get('/:id', productsController.productById);

router.get('/:type/:value', productsController.filterProducts);

router.post('/create', auth.adminAuth, productsController.addProduct);

router.post('/delete/:id', auth.adminAuth, productsController.deleteProduct);

router.post('/update/:id', auth.adminAuth, productsController.updateProduct);

module.exports = router;  