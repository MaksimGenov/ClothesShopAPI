const brandServices = require('../services/index-brand.service')
const productServices = require('../../products/services/index-product.service')
const imageServices = require('../../images/image-services')
const categoryServices = require('../../categories/services/index-category.service')
const cartServices = require('../../cart/services/index-cart.service')

module.exports = async function deleteBrand (req, res, next) {
  const brandId = req.params.id
  try {
    const brand = await brandServices.getById(brandId)
    let imagesToDelete = []
    imagesToDelete.push(brand.image)

    let productsToDeleteIds = brand.products || []
    let deletedProducts = await Promise.all(productsToDeleteIds.map(productServices.delete))
    let categoriesToUpdate = []
    let cartsToUpdate = []

    for (const product of deletedProducts) {
      categoriesToUpdate = product.categories.map(category => categoryServices.removeProduct(category._id, product.id))
      cartsToUpdate = product.carts.map(cart => cartServices.removeProduct(cart._id, product.id))
      imagesToDelete = imagesToDelete.concat(product.images.map(image => image._id))
    }

    await Promise.all(imagesToDelete.map(image => imageServices.remove(image)))
    await Promise.all(categoriesToUpdate)
    await Promise.all(cartsToUpdate)
    await brandServices.delete(brandId)
    res.json({message: `Brand: ${brand.name} and all of it's products deleted.`})
  } catch (error) {
    next(error)
  }
}
