const brandServices = require('../services/index-brand.service')

module.exports = async function getBrandById (req, res, next) {
  const brandId = req.params.id
  try {
    const brand = await brandServices.getById(brandId)
    res.json(brand)
  } catch (error) {
    next(error)
  }
}
