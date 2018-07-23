const mongoose = require('mongoose')
const Product = mongoose.model('Product')

module.exports = async function get (req, res, next) {
  const productId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400)
    return res.json({ error: 'Invalid id' })
  }

  try {
    const product = await Product
      .findById(productId)
      .populate({path: 'categories', model: 'Category', select: 'name'})
      .populate({path: 'brand', model: 'Brand', select: 'name'})
      .populate({path: 'images', model: 'Image', select: 'url'})
    if (!product) {
      res.status(404)
      return res.json({error: `Product with id: "${productId}" does not exist!`})
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
}
