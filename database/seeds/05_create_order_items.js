
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('order_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('order_items').insert([
        {
          quantity: 1, 
          order_id: 1,
          product_id: 6
        },
        {
          quantity: 3, 
          order_id: 1,
          product_id: 7
        },
        {
          quantity: 4, 
          order_id: 1,
          product_id: 2
        },
        {
          quantity: 2, 
          order_id: 2,
          product_id: 7
        },
        {
          quantity: 2, 
          order_id: 2,
          product_id: 6
        },
        {
          quantity: 2, 
          order_id: 3,
          product_id: 3
        },
        {
          quantity: 1, 
          order_id: 4,
          product_id: 9
        },
        {
          quantity: 4, 
          order_id: 4,
          product_id: 6
        },
        {
          quantity: 1, 
          order_id: 4,
          product_id: 3
        }
      ]);
    });
};