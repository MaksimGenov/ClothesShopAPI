const mongoose = require('mongoose')

const shippingAddressSchema = new mongoose.Schema({
  town: { type: String, required: true },
  postCode: { type: mongoose.SchemaTypes.Number, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true }
})

mongoose.model('ShippingAddress', shippingAddressSchema)
module.exports = mongoose.model('ShippingAddress')
