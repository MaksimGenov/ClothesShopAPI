const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: mongoose.SchemaTypes.Number, min: 0, required: true },
  product: { type: mongoose.SchemaTypes.ObjectId, required: true }
})

mongoose.model('Size', sizeSchema)
module.exports = mongoose.model('Size')
