const { knex } = require('../database/config');

before(async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();
})

// after(async () => {
//   await knex.migrate.rollback();
// }) 