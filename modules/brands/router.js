const router = require('express').Router()
const brandsController = require('./brands-controller')

router
  .post('/create', brandsController.createBrand)
  .get('/get/:id', brandsController.getBrandById)
  .get('/all', brandsController.getAllBrands)
  .get('/:id/products', brandsController.getBrandProducts)
  .delete('/delete/:id', brandsController.deleteBrand)
  .put('/update/:id', brandsController.updateBrand)
module.exports = router
