const productServices = require('../../products/services/index-product.service')
const cartServices = require('../services/index-cart.service')

module.exports = async function addProductToCart (req, res, next) {
  const productId = req.params.productId
  const cartId = req.params.cartId
  try {
    await productServices.getById(productId)
    const message = await cartServices.addProduct(cartId, productId)
    await productServices.addCart(productId, cartId)
    res.status(204).end(message)
  } catch (error) {
    next(error)
  }
}
