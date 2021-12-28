
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cart_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('cart_items').insert([
        {
          quantity: 2,
          product_id: 2,
          cart_id: 1
        },
        {
          quantity: 1,
          product_id: 3,
          cart_id: 1
        },
        {
          quantity: 3,
          product_id: 4,
          cart_id: 1
        },
        {
          quantity: 1,
          product_id: 5,
          cart_id: 1
        }
      ]);
    });
};
