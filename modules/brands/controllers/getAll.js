const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')

module.exports = async function getAll (req, res, next) {
  try {
    const brands = await Brand.find()
      .populate({
        path: 'products',
        model: 'Product',
        populate: {path: 'images', model: 'Image', select: 'url'}
      })
      .populate({
        path: 'products',
        model: 'Product',
        populate: {path: 'brand', model: 'Brand', select: 'name'}
      })
      .populate({
        path: 'products',
        model: 'Product',
        populate: {path: 'categories', model: 'Category', select: 'name'}
      })
    res.json(brands)
  } catch (error) {
    next(error)
  }
}
