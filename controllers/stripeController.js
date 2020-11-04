const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orders');

exports.createCharge = async (req, res) => {
  let { amount, token, order } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      payment_method: token,
      confirm: true 
    });
    const newOrder = new Order({
      contactInfo: order.contact,
      orderInfo: order.order,
      shippingInfo: order.shipping,
      complete: false
    })
    newOrder.save(err => {
      if(err) {
        res.status(400).json({
          message: "Charge made but failed save order information.",
          success: false
        })
      }else {
        res.status(200).json({
          message: "Payment successful.",
          orderId: newOrder._id,
          success: true
        });
      }
    })
  }
  catch(error) {
    res.status(400).json({
      message: error.payment_intent.last_payment_error.message,
      success: false
    })
  }
}