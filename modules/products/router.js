const router = require('express').Router()
const productsController = require('./controllers/product-index.controller')
const passport = require('passport')
const isAdmin = require('../users/controllers/is-admin.controller')

module.exports = router
  .post('/create', passport.authenticate('jwt', { session: false }), isAdmin, productsController.create)
  .get('/all', productsController.getAll)
  .get('/:id', productsController.get)
  .delete('/:id', passport.authenticate('jwt', { session: false }), isAdmin, productsController.delete)
  .put('/:id', passport.authenticate('jwt', { session: false }), isAdmin, productsController.edit)
