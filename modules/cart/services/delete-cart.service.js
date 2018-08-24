const getCartById = require('./get-cart-by-id.service')

module.exports = function deleteCart (cartId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await getCartById(cartId)
      await cart.remove()
      resolve(cart)
    } catch (error) {
      reject(error)
    }
  })
}
