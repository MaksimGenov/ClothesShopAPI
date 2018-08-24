const productServices = require('../../products/services/index-product.service')
const cartServices = require('../services/index-cart.service')

module.exports = async function removeProductFromCart (req, res, next) {
  const productId = req.params.productId
  const cartId = req.params.cartId
  try {
    await productServices.getById(productId)
    let message = await cartServices.removeProduct(cartId, productId)
    await productServices.removeCart(productId, cartId)
    res.json({message})
  } catch (error) {
    next(error)
  }
}
