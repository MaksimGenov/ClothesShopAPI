const router = require('express').Router()
const productsController = require('./products-controller')

module.exports = router
  .post('/create', productsController.createProduct)
  .get('/get/:id', productsController.getProductById)
  .get('/all', productsController.getAllProducts)
  .delete('/delete/:id', productsController.deleteProduct)
  .put('/update/:id', productsController.updateProduct)
