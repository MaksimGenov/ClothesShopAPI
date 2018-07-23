const router = require('express').Router()
const productsController = require('./controllers/index')

module.exports = router
  .post('/create', productsController.create)
  .delete('/remove/:id', productsController.remove)
  .get('/get/:id', productsController.get)
  .get('/all', productsController.getAll)
  .put('/update/:id', productsController.update)
