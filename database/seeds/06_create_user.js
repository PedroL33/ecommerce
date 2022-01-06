const bcrypt = require('bcrypt');
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'peterl33',
          password: password,
          permissions: 'admin',
          email: 'leepeter019@gmail.com'
        }
      ]);
    });
};
