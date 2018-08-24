const brandServices = require('../services/index-brand.service')
const productServices = require('../../products/services/index-product.service')

module.exports = async function getBrandProducts (req, res, next) {
  const brandId = req.params.id
  try {
    const brand = await brandServices.getById(brandId)
    const products = await Promise.all(brand.products.map(productId => productServices.getById(productId)))
    res.json(products)
  } catch (error) {
    next(error)
  }
}
