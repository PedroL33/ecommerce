const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const orderSchema = new schema({
  contactInfo: {type: Object, required: true}, 
  orderInfo: {type: Array, required: true},
  id: ObjectId,
  shippingInfo: {type: Object, required: true},
  complete: {type: Boolean}
})

module.exports = mongoose.model("Order", orderSchema);