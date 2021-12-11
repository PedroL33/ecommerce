var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser')
require('dotenv').config()

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var stripeRouter = require('./routes/stripe');
var orderRouter = require('./routes/orders');

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

module.exports = app;
