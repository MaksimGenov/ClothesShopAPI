const router = require('express').Router()
const usersController = require('../users/controllers/index-user.controller')
router
  .post('/register', usersController.register)
  .post('/login', usersController.login)

module.exports = router
