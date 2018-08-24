const brandServices = require('../../brands/services/index-brand.service')
const imageServices = require('../../images/image-services')
const categoryServices = require('../../categories/services/index-category.service')
const productServices = require('../../products/services/index-product.service')
const cartServices = require('../../cart/services/index-cart.service')

module.exports = async function deleteProduct (req, res, next) {
  const productId = req.params.id
  try {
    const product = await productServices.delete(productId)
    const brandId = product.brand._id
    await brandServices.removeProduct(brandId, productId)

    let categories = product.categories || []
    await Promise.all(categories.map(category => categoryServices.removeProduct(category._id, productId)))

    let images = product.images || []
    await Promise.all(images.map(image => imageServices.remove(image._id)))

    await Promise.all(product.carts.map(cartId => cartServices.removeProduct(cartId, productId)))

    res.json({ message: 'Product deleted successfully.' })
  } catch (error) {
    next(error)
  }
}
