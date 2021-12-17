const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/checkAuth');
const { validate } = require('../middleware/validate');
const validations = require('../middleware/validations');

router.get('/', productsController.allProducts);

router.get('/:id', productsController.productById);

router.post('/', auth.adminAuth, validate(validations.createProduct), productsController.addProduct);

router.get('/:type/:value', productsController.filterProducts);

router.post('/delete/:id', auth.adminAuth, productsController.deleteProduct);

router.post('/update/:id', auth.adminAuth, productsController.updateProduct);

router.post('/uploadPhoto/:id', auth.adminAuth, productsController.uploadPhoto);

module.exports = router;  