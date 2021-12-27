const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const handleErrors = require('./middleware/errors');
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const stripeRouter = require('./routes/stripe');
const orderRouter = require('./routes/orders');
const cartRouter = require('./routes/carts');
require('dotenv').config()

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/stripe', stripeRouter);
app.use('/orders', orderRouter);
app.use('/carts', cartRouter);

app.use(handleErrors);

module.exports = app;
