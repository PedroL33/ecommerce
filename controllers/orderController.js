
const { db } = require('../database/config');
const { BadRequest, NotFound } = require('../utils/errors');

exports.allOrders = async (req, res, next) => {
  try {
    const orders = await db.query('SELECT * FROM orders;')
    res.status(200).json(orders.rows);
  }catch(err) {
    next(err)
  }
} 

exports.orderDetailsById = async (req, res, next) => {
  try {
    const order = await db.query(`
      SELECT * 
      FROM orders 
      WHERE id=$1
    `, [req.params.id]);
    if(!order.rows.length) {
      throw new BadRequest('Order cannot be found.')
    }
    res.status(200).json(order.rows[0]);
  }catch(err) {
    next(err)
  }
}

exports.orderItemsById = async (req, res, next) => {
  try {
    const orderItems = await db.query(`
      SELECT order_items.id, name, image, price, category, quantity
      FROM orders 
      JOIN order_items 
      ON orders.id=order_items.order_id
      JOIN products 
      ON products.id=order_items.product_id
      WHERE orders.id=$1;
    `, [req.params.id]);
    if(!orderItems.rows.length) {
      throw new BadRequest('Order cannot be found.')
    }
    res.status(200).json(orderItems.rows);
  }catch(err) {
    console.log(err.message)
    next(err)
  }
}

exports.ordersByStatus = async (req, res, next) => {
  try {
    const orders = await db.query(`
      SELECT * 
      FROM orders
      WHERE status=$1;
    `, [req.params.status]);
    res.status(200).json(orders.rows);
  }catch(err) {
    next(err);
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    if(!req.body.status) {
      throw new BadRequest('Update failed. Missing status parameter.')
    }
    const order = await db.query(`
      UPDATE orders
      SET status=$1 
      WHERE id=$2
      RETURNING *; 
    `, [req.body.status, req.params.id]);
    res.status(200).json(order.rows[0]);
  }catch(err) {
    next(err)
  }
}