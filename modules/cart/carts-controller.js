const cartServices = require('./cart-services')
const productServices = require('../products/product-services')

async function getCartById (req, res, next) {
  const cartId = req.params.id
  try {
    const cart = await cartServices.getCartById(cartId)
    res.json(cart)
  } catch (error) {
    next(error)
  }
}

async function addProductToCart (req, res, next) {
  const productId = req.params.productId
  const cartId = req.params.cartId
  try {
    await productServices.getProductById(productId)
    const message = await cartServices.addProductToCart(cartId, productId)
    await productServices.addCartToProduct(cartId)
    res.json({message})
  } catch (error) {
    next(error)
  }
}

async function removeProductFromCart (req, res, next) {
  const productId = req.params.productId
  const cartId = req.params.cartId
  try {
    await productServices.getProductById(productId)
    let message = await cartServices.removeProductFromCart(cartId, productId)
    await productServices.removeCartFromProduct(productId, cartId)
    res.json({message})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getCartById,
  addProductToCart,
  removeProductFromCart
}
