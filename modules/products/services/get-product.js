const mongoose = require('mongoose')
const Product = mongoose.model('Product')

module.exports = async function getProduct (productId) {
  return new Promise(async (resolve, reject) => {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(`Invalid product id: ${productId}`))
    }

    try {
      const product = await Product
        .findById(productId)
        .populate({path: 'categories', model: 'Category', select: 'name'})
        .populate({path: 'brand', model: 'Brand', select: 'name'})
        .populate({path: 'images', model: 'Image', select: 'url'})
      if (!product) {
        return reject(new ReferenceError(`Product with id: "${productId}" does not exist!`))
      }
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
