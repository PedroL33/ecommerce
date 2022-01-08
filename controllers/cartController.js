const { db } = require('../database/config');
const jwt = require('jsonwebtoken');
const { BadRequest, NotFound } = require('../utils/errors');

exports.getCart = async (req, res, next) => {
  try {
    if(req.headers.authorization === undefined) {
      throw new BadRequest("Cart could not be found.")
    }
    const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET_KEY);
    const cart = await db.query(
      `SELECT * 
      FROM cart_items 
      JOIN carts ON cart_items.cart_id=carts.id 
      JOIN products ON products.id=cart_items.product_id 
      WHERE cart_items.cart_id=$1;`
      , [decoded.id]
    );
    res.status(200).json(cart.rows)
  }catch(err) {
    next(err)
  }
}       

exports.createCart = async (req, res, next) => {
  try {
    const cartID = await db.query(
      'INSERT INTO carts DEFAULT VALUES RETURNING id;'
    )
    if(!cartID.rows.length) {
      throw new BadRequest('Cart could not be created.')
    }
    const token = jwt.sign(
      { id: cartID.rows[0].id }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '1d' }
    )
    res.status(200).json({token});
  }catch(err) {
    next(err)
  }
}

exports.deleteCart = async (req, res, next) => {
  try {
    if(req.headers.authorization === undefined) {
      throw new BadRequest('Cart could not be found.')
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const cart = await db.query('DELETE FROM carts WHERE id=$1 RETURNING *', [decoded.id]);
    if(!cart.rows.length) {
      throw new NotFound('Cart could not be deleted')
    }
    res.status(200).json({msg: `Cart ${decoded.id} deleted.`});
  }catch(err) {
    next(err)
  }
}