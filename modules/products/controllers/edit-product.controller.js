const errorMsgGenerator = require('../../../utils/errorMessageGenerator')
const brandServices = require('../../brands/services/index-brand.service')
const imageServices = require('../../images/image-services')
const categoryServices = require('../../categories/services/index-category.service')
const productServices = require('../../products/services/index-product.service')

module.exports = async function editProduct (req, res, next) {
  const productId = req.params.id
  let { brand, model, description, price, categories, color } = req.body
  let files = req.files || []
  try {
    categories = JSON.parse(categories)
  } catch (error) {
    return next(new TypeError(errorMsgGenerator.invalidDataMsg('categoriesIds', 'JSON array', categories)))
  }
  let images
  try {
    let product = await productServices.getById(productId)
    let newBrand = await brandServices.getByName(brand)
    let oldBrand = product.brand
    let newCategories = await Promise.all(categories.map(categoryId => categoryServices.getByName(categoryId)))
    let oldCategories = product.categories

    if (oldBrand.name !== brand) {
      await brandServices.removeProduct(oldBrand._id, product._id)
      await brandServices.addProduct(newBrand._id, product._id)
    }

    await Promise.all(oldCategories.map(category => categoryServices.removeProduct(category._id, product._id)))
    await Promise.all(newCategories.map(category => categoryServices.addProduct(category._id, product._id)))

    let categoriesIds = newCategories.map(category => category._id)
    images = files ? await Promise.all(Object.keys(files).map(key => imageServices.create(files[key]))) : []

    await productServices.edit(product._id, newBrand._id, model, description, price, categoriesIds, color, images)

    product = await productServices.getPublic(product._id)
    res.json(product)
  } catch (error) {
    if (images) {
      await Promise.all(images.map(image => imageServices.remove(image)))
    }
    next(error)
  }
}
