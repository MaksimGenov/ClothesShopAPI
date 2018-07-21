const router = require('express').Router()
const brandsController = require('../brands/brands-controller')
router
  .post('/create', brandsController.create)
  .post('/delete/:id', brandsController.remove)
  .get('/all', brandsController.getAll)
  .get('/count', brandsController.getCount)
  .get('/:id', brandsController.getById)
module.exports = router
