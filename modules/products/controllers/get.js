const productServices = require('../services/index')

module.exports = async function get (req, res, next) {
  const productId = req.params.id

  try {
    const product = await productServices.getProduct(productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
}
