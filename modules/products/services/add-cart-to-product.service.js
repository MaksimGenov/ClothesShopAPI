const getProductById = require('./get-product-by-id.service')

module.exports = function addCartToProduct (productId, cartId) {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await getProductById(productId)

      for (const cart of product.carts) {
        if (cart._id.toString() === cartId) {
          return resolve()
        }
      }

      product.carts.push(cartId)
      await product.save()
      resolve('Cart added to product.')
    } catch (error) {
      reject(error)
    }
  })
}
