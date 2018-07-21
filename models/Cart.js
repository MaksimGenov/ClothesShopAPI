const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  products: [ {type: mongoose.SchemaTypes.ObjectId, ref: 'Product'} ]
})

mongoose.model('Cart', cartSchema)
module.exports = mongoose.model('Cart')
