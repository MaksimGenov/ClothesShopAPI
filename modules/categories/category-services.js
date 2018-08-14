const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const errorMsgGenerator = require('../../utils/errorMessageGenerator')

function createCategory (name, image) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('name', 'string', name)))
    }
    try {
      const category = await Category.create({name, image})
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

function getCategoryById (categoryId) {
  return new Promise(async (resolve, reject) => {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Category', categoryId)))
    }
    try {
      const category = await Category.findById(categoryId)
      if (!category) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Category', categoryId)))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

function getAllCategories () {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await Category.find().populate('image')
      resolve(categories)
    } catch (error) {
      reject(error)
    }
  })
}

function deleteCategory (categoryId) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await getCategoryById(categoryId)
      await category.remove()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

function addProductToCategory (categoryId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await getCategoryById(categoryId)
      category.products.push(productId)
      await category.save()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

function removeProductFromCategory (categoryId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await getCategoryById(categoryId)
      category.products = category.products.filter(id => id.toString() !== productId.toString())
      await category.save()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

function updateCategory (categoryId, name) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('name', 'string', name)))
    }
    try {
      let category = await getCategoryById(categoryId)
      category.name = name
      await category.save()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

function getByName (name) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await Category.findOne({name: name.toLowerCase()})
      if (!category) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModel('Category')))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createCategory,
  getByName,
  getCategoryById,
  getAllCategories,
  deleteCategory,
  updateCategory,
  addProductToCategory,
  removeProductFromCategory
}
