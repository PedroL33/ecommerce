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
  added_at: {type: Date}
})

module.exports = mongoose.model('Product', productSchema);