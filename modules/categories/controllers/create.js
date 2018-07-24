const categoryServices = require('../services/index')

module.exports = async function create (req, res, next) {
  const {name} = req.body
  try {
    const category = await categoryServices.createCategory({name})
    res.json(category)
  } catch (error) {
    next(error)
  }
}
