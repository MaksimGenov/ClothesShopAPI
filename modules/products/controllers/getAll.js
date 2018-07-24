const productServices = require('../services/index')

module.exports = async function getAll (req, res, next) {
  try {
    const products = await productServices.getAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}
