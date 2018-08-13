const router = require('express').Router()
const categoriesController = require('./categories-controller')
// const passport = require('passport')

router
  .post('/create', categoriesController.createCategory)
  .get('/:id/products', categoriesController.getCategoryProducts)
  .get('/get/:id', categoriesController.getCategoryById)
  .get('/all', categoriesController.getAllCategories)
  .delete('/delete/:id', categoriesController.deleteCategory)
  .put('/update/:id', categoriesController.updateCategory)

module.exports = router
