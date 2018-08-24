const cartServices = require('../services/index-cart.service')
const productServices = require('../../products/services/index-product.service')

module.exports = async function getCartById (req, res, next) {
  const cartId = req.params.id
  try {
    const cart = await cartServices.getById(cartId)
    cart.products = await Promise.all(cart.products.map(productId => productServices.getPublic(productId)))
    res.json(cart)
  } catch (error) {
    next(error)
  }
}
