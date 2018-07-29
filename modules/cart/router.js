const router = require('express').Router()
const cartController = require('./cart-services')
router
  .get('/get/:id', cartController.getCartById)
  .post('/:cartId/addProduct/:productId', cartController.addProductToCart)
  .post('/:cartId/removeProduct/:productId', cartController.removeProductFromCart)

module.exports = router
