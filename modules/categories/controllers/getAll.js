const categoryServices = require('../services/index')

module.exports = async function getAll (req, res, next) {
  try {
    const categories = await categoryServices.getAllCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}
