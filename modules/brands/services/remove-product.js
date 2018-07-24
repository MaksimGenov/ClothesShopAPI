const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')

module.exports = function removeProduct (brandId, productId) {
  return new Promise(async (resolve, reject) => {
    if (!brandId || !mongoose.Types.ObjectId.isValid(brandId)) {
      return reject(new TypeError(`Invalid brand id: ${brandId}`))
    }
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(`Invalid product id: ${productId}`))
    }
    try {
      const category = Brand.findByIdAndUpdate(brandId, {$pull: {products: productId}}, {new: true})
      if (!category) {
        return reject(new ReferenceError(`Brand with id: ${brandId} does not exist.`))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
