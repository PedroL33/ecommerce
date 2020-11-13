const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const orderSchema = new schema({
  contact: {type: Object, required: true}, 
  order: {type: Array, required: true},
  id: ObjectId,
  shipping: {type: Object, required: true},
  complete: {type: Boolean},
  date: {type: Date},
  tracking: {type: String}
})

module.exports = mongoose.model("Order", orderSchema);