const router = require('express').Router()
const productsController = require('../products/products-controller')
router
  .post('/create', productsController.create)
  .get('/search', productsController.search)
  .get('/all', productsController.getAll)
  .get('/count', productsController.getCount)
  .get('/details/:id', productsController.getById)

module.exports = router
