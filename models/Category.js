const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Product'}],
  image: { type: mongoose.SchemaTypes.ObjectId, ref: 'Image' }
})

// categorySchema.methods.toJSON = function () {
//   let category = this.toObject()
//   delete category.products
//   return category
// }

mongoose.model('Category', categorySchema)
module.exports = mongoose.model('Category')
