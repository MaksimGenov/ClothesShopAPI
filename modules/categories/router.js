const router = require('express').Router()
const categoriesController = require('./controllers/index')
// const passport = require('passport')

router
  .post('/create', categoriesController.create)
  .get('/all', categoriesController.getAll)
  .get('/get/:id', categoriesController.get)
  .put('/update/:id', categoriesController.update)
  .delete('/delete/:id', categoriesController.remove)

module.exports = router
