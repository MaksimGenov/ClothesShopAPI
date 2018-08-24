const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getPublicProduct (productId) {
  return new Promise(async (resolve, reject) => {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Product', productId)))
    }
    try {
      let product = await Product.findById(productId)
        .populate({path: 'categories', model: 'Category', select: 'name'})
        .populate({
          path: 'brand',
          select: 'image name',
          model: 'Brand',
          populate: {path: 'image', select: 'url', model: 'Image'}
        })
        .populate({path: 'images', model: 'Image', select: 'url'})
        .select('-carts')
      if (!product) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Product', productId)))
      }
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
