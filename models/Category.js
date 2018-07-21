const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Product'}]
})

mongoose.model('Category', categorySchema)
module.exports = mongoose.model('Category')
