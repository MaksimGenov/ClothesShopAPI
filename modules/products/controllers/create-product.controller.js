const errorMsgGenerator = require('../../../utils/errorMessageGenerator')
const brandServices = require('../../brands/services/index-brand.service')
const imageServices = require('../../images/image-services')
const categoryServices = require('../../categories/services/index-category.service')
const productServices = require('../../products/services/index-product.service')

module.exports = async function createProduct (req, res, next) {
  let { brand, model, description, price, categories, color } = req.body
  let files = req.files

  try {
    categories = JSON.parse(categories)
  } catch (error) {
    return next(new TypeError(errorMsgGenerator.invalidDataMsg('categories', 'JSON array', categories)))
  }
  let images
  try {
    images = await Promise.all(Object.keys(files).map(key => imageServices.create(files[key])))
    let brandModel = await brandServices.getByName(brand)
    let categoryModels = await Promise.all(categories.map(category => categoryServices.getByName(category)))
    let categoriesIds = categoryModels.map(category => category._id)
    let product = await productServices.create(brandModel._id, model, description, price, categoriesIds, color, images)
    await brandServices.addProduct(brandModel._id, product._id)
    await Promise.all(categoriesIds.map(categoryId => categoryServices.addProduct(categoryId, product._id)))
    product = await productServices.getPublic(product._id)
    res.json(product)
  } catch (error) {
    if (images) {
      await Promise.all(images.map(image => imageServices.remove(image.id)))
    }
    next(error)
  }
}
