const router = require('express').Router()
const categoriesController = require('../categories/categories-controller')
const passport = require('passport')

router
  .post('/create', passport.authenticate('jwt', {session: false}), categoriesController.create)
  .get('/all', categoriesController.findAll)
  .get('/:id', categoriesController.findById)

module.exports = router
