const { BadRequest, NotFound } = require('../utils/errors');
const { db } = require('../database/config');
const jwt = require('jsonwebtoken');

exports.createCartItem = async (req, res, next) => {
  try {
    if(!req.body.product || !req.body.quantity) {
      throw new BadRequest('Must include product_id and quantity.')
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
    const cartItem = await db.query(
      'INSERT INTO cart_items (quantity, product_id, cart_id) VALUES($1, (SELECT id FROM products WHERE name=$2), $3) RETURNING *;',
      [req.body.quantity, req.body.product, decoded.id]
    )
    if(!cartItem.rows.length) {
      throw new BadRequest('Cart item not created.')
    }
    res.status(200).json(cartItem.rows[0]);
  }catch(err) {
    next(err)
  }
}

exports.updateCartItem = async (req, res, next) => {
  try {
    if(!req.body.quantity) {
      throw new BadRequest('Quantity not specified')
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY)
    const cart_item = await db.query(
      'UPDATE cart_items SET quantity=$1 WHERE id=$2 RETURNING *;', 
      [req.body.quantity, decoded.id]
    )
    res.status(200).json(cart_item.rows[0]);
  }catch(err) {
    next(err)
  }
}

exports.deleteCartItem = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
    const cart_item = await db.query(
      'DELETE FROM cart_items WHERE id=$1 RETURNING *;', 
      [decoded.id]
    )
    res.status(200).json(cart_item.rows[0]);
  }catch(err) {
    next(err)
  }
}