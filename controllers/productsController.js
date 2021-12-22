const fs = require('fs');
const { db } = require('../database/config');
const upload = require('../utils/photoUpload');

exports.allProducts = async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products;');
    res.status(200).json(products.rows);
  }catch(err) {
    console.log(err)
    res.status(500).json({err})
  }
}

exports.productsByCategory = async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products WHERE category=$1;', [req.params.category]);
    res.status(200).json(products.rows)
  }catch(err) {
    console.log(err)
    res.status(500).json({
      errors: [{
        msg: "Server error"
      }]
    })
  }
}

exports.productsBySearch = async (req, res) => {
  try {
    const products = await db.query('SELECT * FROM products WHERE name LIKE $1 OR description LIKE $1', [`%${req.params.value}%`])
    res.status(200).json(products.rows);
  }catch(err) {
    console.log(err)
    res.status(500).json({
      errors: [{
        msg: "Server error"
      }]
    })
  }
}

exports.productById = async (req, res) => {
  try {
    const product = await db.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    res.status(200).json(product.rows[0]);
  }catch(err) {
    console.log(err)
    res.status(500).json({
      errors: [{
        msg: "Server error"
      }]
    })
  }
}

exports.addProduct = async (req, res) => {
  try {
    const product = await db.query(
      'INSERT INTO products (name, description, image, category, quantity, price) VALUES($1, $2, $3, $4, $5, $6);',
      [req.body.name, req.body.description, req.body.image, req.body.category, req.body.quantity, req.body.price]
    )
    if(product.rowCount > 0) {
      res.status(200).json(product);
    }else {
      throw {
        msg: "Product could not be added.",
        product: req.body
      };
    }
  }catch(err) {
    console.log(err)
    res.status(500).json({
      errors: [{
        msg: "Server error"
      }]
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const product = await db.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    if(product.rows.length > 0) {
      await db.query('DELETE FROM products WHERE id=$1', [req.params.id]);
      res.status(200).json({msg: `Product ${req.params.id} deleted.`});
    }else {
      throw { errors: [
        {
          msg: 'Product could not be deleted.',
          id: req.params.id
        }
      ]}
    }
  }catch(err) {
    // console.log(err)
    res.status(400).json(err)
  }
}

exports.updateProduct = async (req, res) => {

  try {
    const product = await db.query(
      'UPDATE products SET name = $1, category = $2, price = $3, description = $4, quantity = $5 WHERE id = $6', 
      [req.body.name, req.body.category, req.body.price, req.body.description, req.body.quantity, req.params.id]
    );
    if(product.rowCount > 0) {
      res.status(200).json(product)
    }else {
      throw { errors: [
        {
          msg:"Product not updated.",
          id: req.params.id,
          updates: req.body
        }
      ]}
    }
  }catch(err) {
    // console.log(err)
    res.status(400).json(err)
  }
}

exports.uploadPhoto = async (req, res) => {
  try {
    const productImg = await db.query('SELECT image FROM products WHERE id=$1', [req.params.id])
    const results = await Promise.all([
      upload.uploadFile(req.file), 
      upload.deleteFile(productImg.rows[0].image)
    ])
    const updatedProduct = await db.query('UPDATE products SET image=$1 WHERE id=$2 RETURNING *', [results[0].Location, req.params.id])
    res.status(200).json(updatedProduct.rows[0])
  }catch(err) {
    res.status(500).json(err)
    console.log(err)
  }finally {
    fs.unlink(req.file.path, (err) => {
      if(err) return console.log(err)
      console.log("success")
    });
  }
}
