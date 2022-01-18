const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const { db } = require('../database/config');
const { getTotal } = require('../utils/getTotals'); 
const { BadRequest } = require('../utils/errors');
const { createOrder } = require("../utils/createOrder");

exports.createPaymentIntent = async (req, res, next) => {
  try {
    if(!req.body.shipping_address || !req.body.shipping_method || !req.body.contact) {
      throw new BadRequest('Must include shipping_address contact, and shipping_method.')
    }
    const token = jwt.decode(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET_KEY);
    const cart = await db.query(
      `SELECT client_id, price 
      FROM cart_items 
      JOIN carts ON cart_items.cart_id=carts.id 
      JOIN products ON products.id=cart_items.product_id 
      WHERE cart_items.cart_id=$1;`
      , [token.id]
    );
    const total = await getTotal(req.body.shipping_address, cart.rows, req.body.shipping_method);
    let intent;
    let metadata = {
      cart_id: token.id,
      shipping: req.body.shipping_method,
      shipping_address: req.body.shipping_address,
      contact: req.body.contact
    }
    if(cart.rows[0].client_id) {
      intent = await stripe.paymentIntents.update(cart.rows[0].client_id.split('_secret_')[0], {
        amount: total,
        metadata
      })
    }else {
      intent = await stripe.paymentIntents.create({
        amount: total,
        payment_method_types: ['card'],
        currency: 'usd',
        metadata
      })
      await db.query(`
        UPDATE carts 
        SET client_id=$1
        WHERE id=$2`, 
        [intent.client_secret, token.id]
      )
    }
    res.status(200).json({client_secret: intent.client_secret})
  }catch(err) {
    next(err)
  }
  
}

exports.handlePayment = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    next(err);
  }
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      try {
        await createOrder(paymentIntent.metadata, paymentIntent.amount);
        console.log(`Order created.`)
      }catch(err) {
        console.log('Order not created.')
        next(err)
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({recieved: true});
}