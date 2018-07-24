const mongoose = require('mongoose')
const Product = mongoose.model('Product')

module.exports = function removeCategory (productId, categoryId) {
  return new Promise(async (resolve, reject) => {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(`Invalid product id: ${productId}`))
    }
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(`Invalid category id: ${categoryId}`))
    }

    try {
      await Product.findByIdAndUpdate(productId, {$pull: {categories: categoryId}})
      resolve({message: 'Brand removed seccessfully.'})
    } catch (error) {
      reject(error)
    }
  })
}
