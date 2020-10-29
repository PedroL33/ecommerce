const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const productSchema = new schema({
  id: ObjectId,
  name: {type: String, required: true},
  price: {type: Number},
  description: {type: String},
  quantity: {type: Number},
  category: {type: Array},
  image: {type: String},
  added_at: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Product', productSchema);