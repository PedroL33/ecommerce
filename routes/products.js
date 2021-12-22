const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const auth = require('../middleware/checkAuth');
const { validate } = require('../middleware/validate');
const validations = require('../middleware/validations');
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})

router.get('/', productsController.allProducts);

router.get('/:id', productsController.productById);

router.get('/category/:category', productsController.productsByCategory);

router.get('/search/:value', productsController.productsBySearch);

router.post('/', auth.adminAuth, validate(validations.createProduct), productsController.addProduct);

router.delete('/:id', auth.adminAuth, productsController.deleteProduct);

router.put('/:id', auth.adminAuth, productsController.updateProduct);

router.put('/uploadPhoto/:id', auth.adminAuth, upload.single('image'), productsController.uploadPhoto);

module.exports = router;  