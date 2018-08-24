const getCartById = require('./get-cart-by-id.service')

module.exports = function removeProductFromCart (cartId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await getCartById(cartId)
      cart.products = cart.products.filter(id => id.toString() !== productId.toString())
      await cart.save()
      resolve('Product removed from cart.')
    } catch (error) {
      reject(error)
    }
  })
}
