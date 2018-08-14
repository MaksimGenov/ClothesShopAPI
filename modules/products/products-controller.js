const productServices = require('./product-services')
const brandServices = require('../brands/brand-services')
const categoryServices = require('../categories/category-services')
const imageServices = require('../images/image-services')
const cartServices = require('../cart/cart-services')
const errorMsgGenerator = require('../../utils/errorMessageGenerator')

async function createProduct (req, res, next) {
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
    let product = await productServices.createProduct(brandModel._id, model, description, price, categoriesIds, color, images)
    await brandServices.addProductToBrand(brandModel._id, product._id)
    await Promise.all(categoriesIds.map(categoryId => categoryServices.addProductToCategory(categoryId, product._id)))
    product = await productServices.getPublicProduct(product._id)
    res.json(product)
  } catch (error) {
    if (images) {
      await Promise.all(images.map(image => imageServices.remove(image.id)))
    }
    next(error)
  }
}

async function getProductById (req, res, next) {
  const productId = req.params.id
  try {
    let product = await productServices.getPublicProduct(productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

async function getAllProducts (req, res, next) {
  try {
    const products = await productServices.getAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

async function deleteProduct (req, res, next) {
  const productId = req.params.id
  try {
    const product = await productServices.deleteProduct(productId)
    const brandId = product.brand._id
    await brandServices.removeProductFromBrand(brandId, productId)

    let categories = product.categories || []
    await Promise.all(categories.map(category => categoryServices.removeProductFromCategory(category._id, productId)))

    let images = product.images || []
    await Promise.all(images.map(image => imageServices.remove(image._id)))

    await Promise.all(product.carts.map(cartId => cartServices.removeProductFromCart(cartId, productId)))

    res.json({ message: 'Product deleted successfully.' })
  } catch (error) {
    next(error)
  }
}

async function updateProduct (req, res, next) {
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
    let product = await productServices.getProductById(productId)
    let newBrand = await brandServices.getByName(brand)
    let oldBrand = product.brand
    let newCategories = await Promise.all(categories.map(categoryId => categoryServices.getByName(categoryId)))
    let oldCategories = product.categories

    if (oldBrand.name !== brand) {
      await brandServices.removeProductFromBrand(oldBrand._id, product._id)
      await brandServices.addProductToBrand(newBrand._id, product._id)
    }

    await Promise.all(oldCategories.map(category => categoryServices.removeProductFromCategory(category._id, product._id)))
    await Promise.all(newCategories.map(category => categoryServices.addProductToCategory(category._id, product._id)))

    let categoriesIds = newCategories.map(category => category._id)
    images = files ? await Promise.all(Object.keys(files).map(key => imageServices.create(files[key]))) : []

    await productServices.updateProduct(product._id, newBrand._id, model, description, price, categoriesIds, color, images)

    product = await productServices.getPublicProduct(product._id)
    res.json(product)
  } catch (error) {
    if (images) {
      await Promise.all(images.map(image => imageServices.remove(image)))
    }
    next(error)
  }
}

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  updateProduct
}
