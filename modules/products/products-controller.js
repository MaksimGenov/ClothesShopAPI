const productServices = require('./product-services')
const brandServices = require('../brands/brand-services')
const categoryServices = require('../categories/category-services')
const imageServices = require('../images/image-services')
const cartServices = require('../cart/cart-services')
const errorMsgGenerator = require('../../utils/errorMessageGenerator')

async function createProduct (req, res, next) {
  let { brandId, model, description, price, categoriesIds, color } = req.body
  let files = req.files

  try {
    categoriesIds = JSON.parse(categoriesIds)
  } catch (error) {
    return next(new TypeError(errorMsgGenerator.invalidDataMsg('categories', 'JSON array', categoriesIds)))
  }
  let images
  try {
    images = await Promise.all(Object.keys(files).map(key => imageServices.create(files[key])))
    await brandServices.getBrandById(brandId)
    await Promise.all(categoriesIds.map(categoryId => categoryServices.getCategoryById(categoryId)))
    const product = await productServices.createProduct(brandId, model, description, price, categoriesIds, color, images)
    await brandServices.addProductToBrand(brandId, product.id)
    await Promise.all(categoriesIds.map(categoryId => categoryServices.addProductToCategory(categoryId, product.id)))
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
    let product = await productServices.getPopulatedProduct(productId)
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
    const brandId = product.brand.id
    await brandServices.removeProductFromBrand(brandId, productId)

    let categories = product.categories || []
    await Promise.all(categories.map(category => categoryServices.removeProductFromCategory(category.id, productId)))

    let images = product.images || []
    await Promise.all(images.map(image => imageServices.remove(image.id)))

    await Promise.all(product.carts.map(cartId => cartServices.removeProductFromCart(cartId, productId)))

    res.json({message: 'Product deleted successfully.'})
  } catch (error) {
    next(error)
  }
}

async function updateProduct (req, res, next) {
  const productId = req.params.id
  let {brandId, model, description, price, categoriesIds, color} = req.body
  let images = req.files || []
  try {
    categoriesIds = JSON.parse(categoriesIds)
  } catch (error) {
    return next(new TypeError(errorMsgGenerator.invalidDataMsg('categoriesIds', 'JSON array', categoriesIds)))
  }

  try {
    let brand = await brandServices.getBrandById(brandId)
    let categories = await Promise.all(categoriesIds.map(categoryId => categoryServices.getCategoryById(categoryId)))
    images = images ? await Promise.all(images.map(image => imageServices.create(image))) : []

    const product = await productServices
      .updateProduct(productId, brand, model, description, price, categories, color, images)
    res.json(product)
  } catch (error) {
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
