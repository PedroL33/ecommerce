const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const userSchema = new schema({
  name: {type: String, minlength: [5, "Must be 5 characters."], unique: true, index: true}, 
  email: {type: String, unique: true, index: true},
  id: ObjectId,
  password: {type: String, minlength: [6, "Must be 6 characters."]}
})

module.exports = mongoose.model('User', userSchema);