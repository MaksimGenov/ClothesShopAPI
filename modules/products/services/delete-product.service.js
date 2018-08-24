const getProductById = require('./get-product-by-id.service')

module.exports = function deleteProduct (productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await getProductById(productId)
      await product.remove()
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
