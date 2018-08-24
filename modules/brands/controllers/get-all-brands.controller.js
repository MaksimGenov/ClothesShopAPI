const brandServices = require('../services/index-brand.service')

module.exports = async function getAllBrands (req, res, next) {
  try {
    const brands = await brandServices.getAll()
    res.json(brands)
  } catch (error) {
    next(error)
  }
}
