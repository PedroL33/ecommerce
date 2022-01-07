const fs = require('fs');
const { db } = require('../database/config');
const upload = require('../utils/photoUpload');
const { BadRequest, NotFound } = require('../utils/errors');

exports.allProducts = async (req, res, next) => {
  try {
    const products = await db.query(`
      SELECT * 
      FROM products 
      ORDER BY id;`
    );
    res.status(200).json(products.rows);
  }catch(err) {
    next(err)
  }
}

exports.productsByCategory = async (req, res, next) => {
  try {
    const products = await db.query('SELECT * FROM products WHERE category=$1;', [req.params.category]);
    res.status(200).json(products.rows)
  }catch(err) {
    next(err)
  }
}

exports.productsBySearch = async (req, res, next) => {
  try {
    const products = await db.query(`
      SELECT * 
      FROM products 
      WHERE UPPER(name) LIKE UPPER($1) 
      OR UPPER(description) LIKE UPPER($1)
      OR UPPER(category) LIKE UPPER($1)`, 
      [`%${req.params.value}%`]
    )
    res.status(200).json(products.rows);
  }catch(err) {
    next(err)
  }
}

exports.productById = async (req, res, next) => {
  try {
    const product = await db.query('SELECT * FROM products WHERE id=$1', [req.params.id]);
    res.status(200).json(product.rows[0]);
  }catch(err) {
    next(err)
  }
}

exports.addProduct = async (req, res, next) => {
  try {
    const product = await db.query(
      'INSERT INTO products (name, description, image, category, stock, price) VALUES($1, $2, $3, $4, $5, $6);',
      [req.body.name, req.body.description, req.body.image, req.body.category, req.body.stock, req.body.price]
    )
    if(product.rowCount < 1) {
      throw new BadRequest('Product could not be added.');
    }
    res.status(200).json(product);
  }catch(err) {
    console.log(err)
    next(err)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await db.query('DELETE FROM products WHERE id=$1 RETURNING *', [req.params.id]);
    if(!product.rows.length) {
      throw new NotFound('Product not found.')
    }
    res.status(200).json({msg: `Product ${req.params.id} deleted.`});
  }catch(err) {
    next(err)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await db.query(
      `UPDATE products 
      SET name = $1, category = $2, price = $3, description = $4, stock = $5 
      WHERE id = $6 
      RETURNING *;`, 
      [req.body.name, req.body.category, req.body.price, req.body.description, req.body.stock, req.params.id]
    );
    if(!product.rows.length) {
      throw new NotFound('Product not found.')
    }
    res.status(200).json(product.rows[0])
  }catch(err) {
    next(err)
  }
}

exports.uploadPhoto = async (req, res, next) => {
  try {
    const productImg = await db.query('SELECT image FROM products WHERE id=$1', [req.params.id])
    if(!productImg.rows.length) {
      throw new NotFound('Product not found.')
    }
    const results = await Promise.all([
      upload.uploadFile(req.file), 
      upload.deleteFile(productImg.rows[0].image)
    ])
    const updatedProduct = await db.query('UPDATE products SET image=$1 WHERE id=$2 RETURNING *', [results[0].Location, req.params.id])
    res.status(200).json(updatedProduct.rows[0])
  }catch(err) {
    console.log(err)
    next(err);
  }finally {
    fs.unlink(req.file.path, (err) => {
      if(err) return console.log(err)
    });
  }
}
