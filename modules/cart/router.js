const router = require('express').Router()
const cartController = require('../cart/cart-controller')
router
  .post('/create', cartController.create)
  .post('/update/:id', cartController.update)
  .get('/:id', cartController.getById)

module.exports = router
