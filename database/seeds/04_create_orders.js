
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          contact: 'email@email.com', 
          shipping: '7591 NW. Smoky Hollow St. Tullahoma, TN 37388',
          total: 3000
        },
        {
          contact: 'email@email.com', 
          shipping: '6 Lyme Lane Freehold, NJ 07728',
          status: 'fulfilled',
          total: 4000
        },
        {
          contact: 'email@email.com', 
          shipping: '860 Lookout St. Des Plaines, IL 60016',
          status: 'refunded',
          total: 5000 
        },
        {
          contact: 'email@email.com', 
          shipping: '8613 Tallwood Drive Mcdonough, GA 30252',
          status: 'fulfilled',
          total: 2000
        }
      ]);
    });
};