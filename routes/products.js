const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/checkAuth');

router.get('/', productsController.allProducts);

router.post('/create', auth, productsController.addProduct);

router.post('/delete/:id', auth, productsController.deleteProduct);

router.post('/update/:id', auth, productsController.updateProduct);

module.exports = router;  