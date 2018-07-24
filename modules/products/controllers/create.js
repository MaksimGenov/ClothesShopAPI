const productServices = require('../services/index')

module.exports = async function create (req, res, next) {
  let { brandId, model, description, price, categoryIds, color } = req.body
  let images = req.files
  try {
    const product = await productServices.createProduct(brandId, model, description, price, categoryIds, color, images)
    res.json(product)
  } catch (error) {
    next(error)
  }
}
