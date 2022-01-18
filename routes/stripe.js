const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');

router.post('/webhook', stripeController.handlePayment);

router.post('/secret', stripeController.createPaymentIntent);

module.exports = router;