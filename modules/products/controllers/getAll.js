const Product = require('mongoose').model('Product')

module.exports = async function getAll (req, res, next) {
  try {
    const products = await Product
      .find()
      .populate({path: 'categories', model: 'Category', select: 'name'})
      .populate({path: 'brand', model: 'Brand', select: 'name'})
      .populate({path: 'images', model: 'Image', select: 'url'})
    // if (!product) {
    //   res.status(404)
    //   return res.json({error: `Product with id: "${productId}" does not exist!`})
    // }
    res.json(products)
  } catch (error) {
    next(error)
  }
}
