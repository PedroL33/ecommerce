
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          name: "Mauris", 
          description: "Description",
          category: "things", 
          quantity: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/437b8b423a375582626f1a93fa222148.png", 
          price: 10000
        },
        {
          name: "Donnec", 
          description: "Description",
          category: "things", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334561892.jpg", 
          price: 25000
        },
        {
          name: "Aenean", 
          description: "Description",
          category: "things", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334593861.jpg", 
          price: 35000
        },
        {
          name: "Aliquam", 
          description: "Description",
          category: "things", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334577291.jpg", 
          price: 10000
        },
        {
          name: "Curabitur", 
          description: "Description",
          category: "things", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334615831.jpg", 
          price: 10000
        },
        {
          name: "Vestibulum", 
          description: "Description",
          category: "gadgets", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334635541.jpg", 
          price: 10000
        },
        {
          name: "Penatibus", 
          description: "Description",
          category: "gadgets", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334937079.jpg", 
          price: 10000
        },
        {
          name: "Lobortis", 
          description: "Description",
          category: "gadgets", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334963509.jpg", 
          price: 10000
        },
        {
          name: "Facilisis", 
          description: "Description",
          category: "gadgets", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334495246.jpg", 
          price: 10000
        },
        {
          name: "Sodales", 
          description: "Description testsearch",
          category: "gadgets", 
          quantity: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/bucketFolder/1605334330239.jpg", 
          price: 10000
        },
        {
          name: "Interdum", 
          description: "Description testsearch",
          category: "items", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334355010.jpg", 
          price: 10000
        },
        {
          name: "Urna", 
          description: "Description testsearch",
          category: "items", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334404481.jpg", 
          price: 10000
        },
        {
          name: "Egestas", 
          description: "Description",
          category: "items", 
          quantity: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334432440.jpg", 
          price: 10000
        },
      ]);
    });
};
 