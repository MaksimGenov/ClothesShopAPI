const router = require('express').Router()
const brandsController = require('./controllers/index')

router
  .post('/create', brandsController.create)
  .get('/get/:id', brandsController.get)
module.exports = router
