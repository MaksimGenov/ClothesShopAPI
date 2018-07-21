const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  categories: [ {type: String, required: true} ],
  brand: { type: String, required: true },
  description: { type: String },
  model: { type: String, required: true },
  price: { type: Number, min: 1, required: true },
  imagesPath: [{ type: String }]
})

mongoose.model('Product', productSchema)
module.exports = mongoose.model('Product')
