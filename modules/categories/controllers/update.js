const categoryServices = require('../services/index')

module.exports = async function update (req, res, next) {
  const categoryId = req.params.id
  const name = req.body.name

  try {
    const category = await categoryServices.updateName(categoryId, name)
    res.json(category)
  } catch (error) {
    next(error)
  }
}
