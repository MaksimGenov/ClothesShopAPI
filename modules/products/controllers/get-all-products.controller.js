const productServices = require('../../products/services/index-product.service')

module.exports = async function getAllProducts (req, res, next) {
  try {
    const products = await productServices.getAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
}
