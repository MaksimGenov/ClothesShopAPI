const categoryServices = require('../services/index-category.service')
const productServices = require('../../products/services/index-product.service')

module.exports = async function getCategoryProducts (req, res, next) {
  const categoryId = req.params.id
  try {
    const category = await categoryServices.getById(categoryId)
    const products = await Promise.all(category.products.map(productId => productServices.getPublic(productId)))
    res.json(products)
  } catch (error) {
    next(error)
  }
}
