const productServices = require('../services/index-product.service')

module.exports = async function getProductById (req, res, next) {
  const productId = req.params.id
  try {
    let product = await productServices.getPublic(productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
}
