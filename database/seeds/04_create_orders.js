
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {
          contact: '7591 NW. Smoky Hollow St. Tullahoma, TN 37388', 
          shipping: '7591 NW. Smoky Hollow St. Tullahoma, TN 37388',
          status: 'pending',
          total: 3000
        },
        {
          contact: '6 Lyme Lane Freehold, NJ 07728', 
          shipping: '6 Lyme Lane Freehold, NJ 07728',
          status: 'fulfilled',
          total: 4000
        },
        {
          contact: '860 Lookout St. Des Plaines, IL 60016', 
          shipping: '860 Lookout St. Des Plaines, IL 60016',
          status: 'refunded',
          total: 5000
        },
        {
          contact: '8613 Tallwood Drive Mcdonough, GA 30252', 
          shipping: '8613 Tallwood Drive Mcdonough, GA 30252',
          status: 'fulfilled',
          total: 2000
        }
      ]);
    });
};