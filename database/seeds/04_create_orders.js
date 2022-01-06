
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          contact: 'email@email.com', 
          shipping_address: '7591 NW. Smoky Hollow St., Tullahoma, TN, United States, 37388',
          total: 3000
        },
        {
          contact: 'email@email.com', 
          shipping_address: '6 Lyme Lane, Freehold, NJ, United States, 07728',
          status: 'fulfilled',
          total: 4000
        },
        {
          contact: 'email@email.com', 
          shipping_address: '860 Lookout St. Des Plaines, IL, United States, 60016',
          status: 'refunded',
          total: 5000 
        },
        {
          contact: 'email@email.com', 
          shipping_address: '8613 Tallwood Drive, Mcdonough, GA, United States, 30252',
          status: 'fulfilled',
          total: 2000
        }
      ]);
    });
};