const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')

module.exports = async function get (req, res, next) {
  const brandId = req.params.id

  if (!brandId && !mongoose.Types.ObjectId.isValid(brandId)) {
    res.status(400)
    return res.json({error: 'Invalid id!'})
  }

  try {
    const brand = await Brand.findById(brandId)
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
    res.json(brand)
  } catch (error) {
    next(error)
  }
}
