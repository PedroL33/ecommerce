const { db } = require('../database/config');

exports.createOrder = (order_details, total) => {
  return db.query(`
    WITH create_order AS (
      INSERT INTO orders (contact, shipping_address, shipping, total)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    ), create_order_items AS (
      INSERT INTO order_items(quantity, product_id, order_id)
      SELECT quantity, product_id, (SELECT id FROM create_order) AS order_id
      FROM cart_items
      WHERE cart_id=$5
    ), delete_cart AS (
      DELETE FROM carts 
      WHERE id=$5 RETURNING *
    )
    SELECT id FROM create_order
    `, [order_details.contact, order_details.shipping_address, order_details.shipping, total, order_details.cart_id]
  )
}