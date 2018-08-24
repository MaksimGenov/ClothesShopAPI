const getProductById = require('./get-product-by-id.service')

module.exports = function removeCartFromProduct (productId, cartId) {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await getProductById(productId)
      product.carts = product.carts.filter(id => id.toString() !== cartId.toString())
      await product.save()
      resolve('Cart removed from product.')
    } catch (error) {
      reject(error)
    }
  })
}
