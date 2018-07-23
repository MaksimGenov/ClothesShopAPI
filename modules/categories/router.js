const router = require('express').Router()
const categoriesController = require('../categories/categories-controller')
// const passport = require('passport')

router
  .post('/create', categoriesController.create)
  .get('/all', categoriesController.findAll)
  .get('/:id', categoriesController.findById)

module.exports = router
