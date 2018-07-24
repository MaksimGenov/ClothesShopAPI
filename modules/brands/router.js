const router = require('express').Router()
const brandsController = require('./controllers/index')

router
  .post('/create', brandsController.create)
  .get('/get/:id', brandsController.get)
  .get('/all', brandsController.getAll)
  .delete('/delete/:id', brandsController.remove)
module.exports = router
