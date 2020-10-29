const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCharge = async (req, res) => {
  let { amount, token, order } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      payment_method: token,
      confirm: true 
    });
    res.json({
      message: "Payment successful.",
      success: true
    });
  }
  catch(error) {
    res.json({
      message: error.payment_intent.last_payment_error.message,
      success: false
    })
  }
}