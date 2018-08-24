const router = require('express').Router()
const categoriesController = require('./controllers/index-category.controller')
const passport = require('passport')
const isAdmin = require('../users/controllers/is-admin.controller')

router
  .post('/create', passport.authenticate('jwt', { session: false }), isAdmin, categoriesController.create)
  .get('/all', categoriesController.getAll)
  .get('/:id/products', categoriesController.getProducts)
  .get('/:id', categoriesController.get)
  .put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, categoriesController.edit)
  .delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, categoriesController.delete)

module.exports = router
