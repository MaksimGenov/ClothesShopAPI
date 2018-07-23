const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = async function get (req, res, next) {
  try {
    const category = await Category.find().populate('products')
    res.json(category)
  } catch (error) {
    next(error)
  }
}
