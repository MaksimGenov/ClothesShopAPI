const categoryServices = require('./category-services')
const productServices = require('../products/product-services')

async function createCategory (req, res, next) {
  const {name} = req.body
  try {
    const category = await categoryServices.createCategory(name)
    res.json(category)
  } catch (error) {
    next(error)
  }
}

async function getCategoryById (req, res, next) {
  const categoryId = req.params.id
  try {
    const category = await categoryServices.getCategoryById(categoryId)
    res.json(category)
  } catch (error) {
    next(error)
  }
}

async function getAllCategories (req, res, next) {
  try {
    const categories = await categoryServices.getAllCategories()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}

async function deleteCategory (req, res, next) {
  const categoryId = req.params.id
  try {
    const category = await categoryServices.deleteCategory(categoryId)
    await Promise.all(category.products.map(productId => productServices.removeCategoryFromProduct(productId, categoryId)))
    res.json({message: 'Category deleted successfully.'})
  } catch (error) {
    next(error)
  }
}

async function updateCategory (req, res, next) {
  const categoryId = req.params.id
  const name = req.body.name
  try {
    const category = await categoryServices.updateCategory(categoryId, name)
    res.json(category)
  } catch (error) {
    next(error)
  }
}

async function getCategoryProducts (req, res, next) {
  const categoryId = req.params.id
  try {
    const category = await categoryServices.getCategoryById(categoryId)
    const products = await Promise.all(category.products.map(productId => productServices.getProductById(productId)))
    res.json(products)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  getCategoryProducts,
  updateCategory,
  deleteCategory
}
