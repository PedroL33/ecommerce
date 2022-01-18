// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.PSQL_CONNECTION,
    migrations: {
      directory: './database//migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  production: {
    client: 'pg',
    debug: true,
    ssl: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + './database/seeds'
    }
  }

};
