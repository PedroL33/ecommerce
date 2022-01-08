const { BadRequest, NotFound } = require('../utils/errors');
const { db } = require('../database/config');
const jwt = require('jsonwebtoken');
const { knex } = require('../database/config'); 

exports.createCartItem = async (req, res, next) => {
  try {
    if(!req.body.product || !req.body.quantity) {
      throw new BadRequest('Must include product_id and quantity.')
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
    const cart_item = await db.query(
      `WITH cart_item as (
        INSERT INTO cart_items (quantity, product_id, cart_id) 
        VALUES($1, (SELECT id FROM products WHERE name=$2), $3) 
        RETURNING *
      ), update_product as (
        UPDATE products 
        SET stock=stock-$1 
        WHERE id=(SELECT product_id FROM cart_item)
      )
      SELECT * FROM cart_item;`,
      [req.body.quantity, req.body.product, decoded.id]
    )
    if(!cart_item.rows.length) {
      throw new BadRequest('Cart item not created.')
    }
    res.status(200).json(cart_item.rows[0]);
  }catch(err) {
    next(err)
  }
}

exports.updateCartItem = async (req, res, next) => {
  try {
    if(!req.body.quantity || !req.body.product_id) {
      throw new BadRequest('Quantity not specified')
    }
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY)
    const cart_item = await db.query(
      `WITH get_cart_item as (
        SELECT * 
        FROM cart_items 
        WHERE cart_id=$2 AND product_id=$4
      ), update_cart_item as (
        UPDATE cart_items 
        SET quantity=$1, modified_at=to_timestamp($3)
        WHERE cart_id=$2 AND product_id=$4 
        RETURNING *
      ), update_products as (
        UPDATE products 
        SET stock=stock-($1-(SELECT quantity FROM get_cart_item)) 
        WHERE id=(SELECT product_id FROM update_cart_item))
        SELECT * FROM update_cart_item;
      `, 
      [req.body.quantity, decoded.id, Date.now()/1000, req.body.product_id]
    )
    if(!cart_item.rows.length) {
      throw new BadRequest('Item could not be added to cart.')
    }
    res.status(200).json(cart_item.rows[0]);
  }catch(err) {
    next(err)
  }
}

exports.deleteCartItem = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
    const cart_item = await db.query(
      `WITH deleted_cart_item AS (
        DELETE FROM cart_items WHERE id=$1 RETURNING *
      ), updated_cart_item AS (
        UPDATE products 
        SET stock=stock+(SELECT quantity FROM deleted_cart_item)
        WHERE id=(SELECT product_id FROM deleted_cart_item)
      )
      SELECT * FROM deleted_cart_item`, 
      [decoded.id]
    )
    res.status(200).json(cart_item.rows[0]);
  }catch(err) {
    next(err)
  }
}