require('dotenv').config();
const{ Pool } = require('pg');

// knex config for migrations
const configuration = require('../knexfile')[process.env.NODE_ENV || 'development']

const knex = require('knex')(configuration);

// pg configuration to connect to psql
const connectionString = process.env.DATABASE_URL;

const db = new Pool({
 connectionString
})

module.exports = { db, knex };