require('dotenv').config();

const configuration = require('../knexfile')[process.env.NODE_ENV || 'development']

const db = require('knex')(configuration);

module.exports = { db };