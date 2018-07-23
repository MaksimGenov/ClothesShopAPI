const router = require('express').Router()
const productsController = require('./controllers/index')

module.exports = router
  .post('/create', productsController.create)
  .post('/remove/:id', productsController.remove)
  .get('/get/:id', productsController.get)
  .get('/all', productsController.getAll)
  .post('/update/:id', productsController.update)
