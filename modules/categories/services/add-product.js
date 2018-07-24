const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = function addProduct (categoryId, productId) {
  return new Promise(async (resolve, reject) => {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(`Invalid category id: ${categoryId}`))
    }
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(`Invalid product id: ${productId}`))
    }
    try {
      const category = Category.findByIdAndUpdate(categoryId, {$push: {products: productId}}, {new: true})
      if (!category) {
        return reject(new ReferenceError(`Category with id: ${categoryId} does not exist.`))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
