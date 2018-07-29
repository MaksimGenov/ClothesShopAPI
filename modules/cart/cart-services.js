const Cart = require('mongoose').model('Cart')
const errorMsgGenerator = require('../../utils/errorMessageGenerator')

function createCart (userId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await Cart.create({user: userId})
      resolve(cart)
    } catch (error) {
      reject(error)
    }
  })
}

function getCartById (cartId) {
  return new Promise(async (resolve, reject) => {
    let cart = await Cart.findById(cartId)
    if (!cart) {
      return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Cart', cartId)))
    }
    resolve(cart)
  })
}

function deleteCart (cartId) {
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

function addProductToCart (cartId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await getCartById(cartId)
      cart.products.push(productId)
      await cart.save()
      resolve('Product added to cart.')
    } catch (error) {
      reject(error)
    }
  })
}

function removeProductFromCart (cartId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await getCartById(cartId)
      cart.products = cart.products.filter(id => id !== productId)
      await cart.save()
      resolve('Product removed from cart.')
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createCart,
  getCartById,
  deleteCart,
  addProductToCart,
  removeProductFromCart
}
