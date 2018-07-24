const categoryServices = require('../services/index')

module.exports = async function remove (req, res, next) {
  const categoryId = req.params.id

  try {
    const message = await categoryServices.deleteCategory(categoryId)
    res.json(message)
  } catch (error) {
    next(error)
  }
}
