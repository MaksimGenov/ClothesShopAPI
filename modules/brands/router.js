const isAdmin = require('../users/controllers/is-admin.controller')
const router = require('express').Router()
const brandsController = require('./controllers/index-brand.controller')
const passport = require('passport')

router
  .post('/create', passport.authenticate('jwt', {session: false}), isAdmin, brandsController.create)
  .get('/all', brandsController.getAll)
  .get('/:id/products', brandsController.getProducts)
  .get('/:id', brandsController.getById)
  .delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, brandsController.delete)
  .put('/:id', passport.authenticate('jwt', {session: false}), isAdmin, brandsController.edit)
module.exports = router
