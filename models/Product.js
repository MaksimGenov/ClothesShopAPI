const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  categories: [ {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'} ],
  brand: { type: mongoose.SchemaTypes.ObjectId, ref: 'Brand', required: true },
  description: { type: String },
  model: { type: String, required: true },
  price: { type: Number, min: 1, required: true },
  sizes: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Sizes' }],
  color: { type: String, required: true },
  images: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Image', usePushEach: true }],
  carts: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Cart' }]
})

productSchema.methods.toJSON = function () {
  let product = this.toObject()
  delete product.carts
  return product
}

mongoose.model('Product', productSchema)
module.exports = mongoose.model('Product')
