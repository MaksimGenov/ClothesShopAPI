const getProductById = require('./get-product-by-id.service')

module.exports = function removeCategoryFromProduct (productId, categoryId) {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await getProductById(productId)
      product.categories = product.categories
        .filter(category => category._id.toString() !== categoryId.toString())
      await product.save()
      resolve('Category removed from product.')
    } catch (error) {
      reject(error)
    }
  })
}
