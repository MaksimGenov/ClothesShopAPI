const Cart = require('mongoose').model('Cart')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getCartById (id) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await Cart.findById(id)
      if (!cart) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Cart', id)))
      }
      resolve(cart)
    } catch (error) {
      reject(error)
    }
  })
}
