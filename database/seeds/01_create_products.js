
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
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/23f4f6e5aa1abb2094c3b033e2d4f4ed.jpeg", 
          price: 10000
        },
        {
          name: "Donnec", 
          description: "Description",
          category: "things", 
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/6c0c8166f22c45bf8b0be9ec1bd817c1.jpeg", 
          price: 25000
        },
        {
          name: "Aenean", 
          description: "Description",
          category: "things", 
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/2a94384587705e6b7d18941e99930386.jpeg", 
          price: 35000
        },
        {
          name: "Aliquam", 
          description: "Description",
          category: "things", 
          stock: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/ecommerce/8908b6350f9262e40f47f94b4af62975.jpeg", 
          price: 10000
        },
        {
          name: "Curabitur", 
          description: "Description",
          category: "things", 
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/e84b730e4914f1052b4bea9f81693da4.jpeg", 
          price: 10000
        },
        {
          name: "Vestibulum", 
          description: "Description",
          category: "gadgets", 
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/aef9600d80d80f64c621c8719ea3f60b.jpeg", 
          price: 10000
        },
        {
          name: "Penatibus", 
          description: "Description",
          category: "gadgets", 
          stock: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334937079.jpg", 
          price: 10000
        },
        {
          name: "Lobortis", 
          description: "Description",
          category: "gadgets", 
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/ecommerce/0f21a7166c6bff13e769973a208b198f.jpeg", 
          price: 10000
        },
        {
          name: "Facilisis", 
          description: "Description",
          category: "gadgets", 
          stock: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334495246.jpg", 
          price: 10000
        },
        {
          name: "Sodales", 
          description: "Description testsearch",
          category: "gadgets", 
          stock: 10, 
          image: "https://chatbucket11.s3.amazonaws.com/bucketFolder/1605334330239.jpg", 
          price: 10000
        },
        {
          name: "Interdum", 
          description: "Description testsearch",
          category: "items", 
          stock: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334355010.jpg", 
          price: 10000
        },
        {
          name: "Urna", 
          description: "Description testsearch",
          category: "items", 
          stock: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334404481.jpg", 
          price: 10000
        },
        {
          name: "Egestas", 
          description: "Description",
          category: "items", 
          stock: 10, 
          image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334432440.jpg", 
          price: 10000
        },
      ]);
    });
};
 