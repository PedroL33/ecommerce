exports.products = [
  {
    id: 1,
    name: "Mauris", 
    description: "Description",
    category: "things", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334548522.jpg", 
    price: 10000
  },
  {
    id: 2,
    name: "Donnec", 
    description: "Description",
    category: "things", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334561892.jpg", 
    price: 25000
  },
  {
    id: 3,
    name: "Aenean", 
    description: "Description",
    category: "things", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334593861.jpg", 
    price: 35000
  },
  {
    id: 4,
    name: "Aliquam", 
    description: "Description",
    category: "things", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334577291.jpg", 
    price: 10000
  },
  {
    id: 5,
    name: "Curabitur", 
    description: "Description",
    category: "things", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334615831.jpg", 
    price: 10000
  },
  {
    id: 6,
    name: "Vestibulum", 
    description: "Description",
    category: "gadgets", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334635541.jpg", 
    price: 10000
  },
  {
    id: 7,
    name: "Penatibus", 
    description: "Description",
    category: "gadgets", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334937079.jpg", 
    price: 10000
  },
  {
    id: 8,
    name: "Lobortis", 
    description: "Description",
    category: "gadgets", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334963509.jpg", 
    price: 10000
  },
  {
    id: 9,
    name: "Facilisis", 
    description: "Description",
    category: "gadgets", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334495246.jpg", 
    price: 10000
  },
  {
    id: 10,
    name: "Sodales", 
    description: "Description testsearch",
    category: "gadgets", 
    quantity: 10, 
    image: "https://chatbucket11.s3.amazonaws.com/bucketFolder/1605334330239.jpg", 
    price: 10000
  },
  {
    id: 11,
    name: "Interdum", 
    description: "Description testsearch",
    category: "items", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334355010.jpg", 
    price: 10000
  },
  {
    id: 12,
    name: "Urna testsearch", 
    description: "Description",
    category: "items", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334404481.jpg", 
    price: 10000
  },
  {
    id: 13,
    name: "Egestas", 
    description: "Description",
    category: "items", 
    quantity: 10, 
    image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334432440.jpg", 
    price: 10000
  }
]

exports.product = {
  name: "New Product",
  price: 10000,
  description: "description",
  quantity: 10,
  image:"img.url",
  category: "items"
}

exports.updatedProduct = {
  name: "Updated Product", 
  description: "New description",
  category: "things", 
  quantity: 10, 
  image: "https://chatbucket11.s3.us-west-2.amazonaws.com/bucketFolder/1605334548522.jpg", 
  price: 10000
}

exports.invalidProduct = {
  name: 12,
  price: "10000",
  description: 10000,
  quantity: "10000",
  category: 10000
}

exports.newUser = {
  username: "FirstUser",
  password: "password",
  permissions: "admin",
  email: 'firstuser@email.com'
}

exports.invalidUser = {
  username: 1,
  password: "1",
  permissions: 1,
  email: 1
}

exports.cartItems = [
  {
    product: 'Interdum',
    quantity: 3
  },
  {
    product: 'Soldales',
    quantity: 1
  }
]

exports.invalidCartItems = [
  {
    product: 'Donnec',
    quantity: 2
  },
  {
    product: 'Does Not Exist',
    quantity: 1
  }
]

exports.updatedCartItems = [
  {
    quantity: 100
  }
]