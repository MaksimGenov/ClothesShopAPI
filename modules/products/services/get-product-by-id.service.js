const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getProductById (productId) {
  return new Promise(async (resolve, reject) => {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Product', productId)))
    }
    try {
      const product = await Product.findById(productId)
        .populate('brand')
        .populate('categories')
        .populate('images')
      if (!product) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Product', productId)))
      }
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
