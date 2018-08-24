const categoryServices = require('../services/index-category.service')

module.exports = async function getCategory (req, res, next) {
  const categoryId = req.params.id
  try {
    const category = await categoryServices.getById(categoryId)
    res.json(category)
  } catch (error) {
    next(error)
  }
}
