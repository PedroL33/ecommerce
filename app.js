var express = require('express');
var cors = require('cors');
var path = require('path');
require('dotenv').config()

const mongoose = require('mongoose');
mongoose.connect(process.env.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database.")
});

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);

module.exports = app;
