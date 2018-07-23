const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const Image = mongoose.model('Image')
const Brand = mongoose.model('Brand')
const Category = mongoose.model('Category')
const Cart = mongoose.model('Cart')
const imageServices = require('../../images/image-services')

module.exports = async function remove (req, res, next) {
  const productId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400)
    return res.json({ error: 'Invalid id' })
  }

  try {
    const product = await Product.findById(productId)
    if (!product) {
      res.status(404)
      return res.json({error: `Product with id: "${productId}" does not exist!`})
    }
    const brandId = product.brand
    await Brand.findByIdAndUpdate(brandId, {$pull: {'products': productId}})

    let categoryIds = product.categories
    await Promise.all(categoryIds.map(id => Category.findByIdAndUpdate(id, {$pull: {'products': productId}})))

    let imageIds = product.images
    let images = await Image.find({'_id': {$in: imageIds}})
    await Promise.all(images.map(image => imageServices.remove(image)))

    let cartsToUpdate = await Cart.find({products: productId})
    await Promise.all(cartsToUpdate.map(cart => Cart.findByIdAndUpdate(cart._id, {$pull: {'products': productId}})))

    await Product.findByIdAndRemove(productId)
    res.json({message: 'Product deleted successfully!'})
  } catch (error) {
    next(error)
  }
}
