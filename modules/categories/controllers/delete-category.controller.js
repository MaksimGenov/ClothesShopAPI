const categoryServices = require('../services/index-category.service')
const productServices = require('../../products/services/index-product.service')

module.exports = async function deleteCategory (req, res, next) {
  const categoryId = req.params.id
  try {
    const category = await categoryServices.delete(categoryId)
    await Promise.all(category.products.map(productId => productServices.removeCategory(productId, categoryId)))
    res.json({message: 'Category deleted successfully.'})
  } catch (error) {
    next(error)
  }
}
