const { db } = require('../database/config');

before(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
})

// after(async () => {
//   await db.migrate.rollback();
// })