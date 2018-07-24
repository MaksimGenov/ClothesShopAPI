const categoryServices = require('../services/index')

module.exports = async function get (req, res, next) {
  const categoryId = req.params.id

  try {
    const category = await categoryServices.getCategory(categoryId)
    res.json(category)
  } catch (error) {
    next(error)
  }
}
