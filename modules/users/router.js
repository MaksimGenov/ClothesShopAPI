const router = require('express').Router()
const usersController = require('../users/users-controller')
router
  .post('/register', usersController.register)
  .post('/login', usersController.login)

module.exports = router
