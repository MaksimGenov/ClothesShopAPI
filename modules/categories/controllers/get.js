const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = async function get (req, res, next) {
  const categoryId = req.params.id

  if (!categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400)
    return res.json({error: 'Invalid id!'})
  }

  try {
    const category = await Category.findById(categoryId).populate('products')
    res.json(category)
  } catch (error) {
    next(error)
  }
}
