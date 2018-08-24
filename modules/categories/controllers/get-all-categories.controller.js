const categoryServices = require('../services/index-category.service')

module.exports = async function getAllCategories (req, res, next) {
  try {
    const categories = await categoryServices.getAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}
