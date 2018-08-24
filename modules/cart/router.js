const router = require('express').Router()
const cartController = require('./controllers/index-cart.controller')
const passport = require('passport')

router
  .get('/:id', passport.authenticate('jwt', { session: false }), cartController.getById)
  .post('/:cartId/addProduct/:productId', passport.authenticate('jwt', { session: false }), cartController.addProduct)
  .post('/:cartId/removeProduct/:productId', passport.authenticate('jwt', { session: false }), cartController.removeProduct)

module.exports = router
