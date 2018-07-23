const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const Product = mongoose.model('Product')

module.exports = async function remove (req, res, next) {
  const categoryId = req.params.id

  if (!categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400)
    return res.json({error: 'Invalid id!'})
  }

  try {
    await Product.updateMany({categories: categoryId}, {$pull: {categories: categoryId}})
    await Category.findByIdAndRemove(categoryId)
    res.json({message: `Category deleted successfully!`})
  } catch (error) {
    next(error)
  }
}
