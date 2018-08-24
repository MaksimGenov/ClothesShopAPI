const Cart = require('mongoose').model('Cart')

module.exports = function createCart (userId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await Cart.create({user: userId})
      resolve(cart)
    } catch (error) {
      reject(error)
    }
  })
}
