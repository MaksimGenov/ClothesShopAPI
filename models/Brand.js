const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: mongoose.SchemaTypes.ObjectId, ref: 'Image' },
  products: [ {type: mongoose.SchemaTypes.ObjectId, ref: 'Product'} ]
})

mongoose.model('Brand', brandSchema)
module.exports = mongoose.model('Brand')
