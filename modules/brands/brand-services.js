const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')
const errorMsgGenerator = require('../../utils/errorMessageGenerator')

function createBrand (name, description, image) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('name', 'string', name)))
    }
    if (!description || typeof description !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('description', 'string', description)))
    }
    if (!image) {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('image', 'file', image)))
    }
    try {
      const brand = await Brand.create({name, description, image})
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

function getBrandById (brandId) {
  return new Promise(async (resolve, reject) => {
    if (!brandId || !mongoose.Types.ObjectId.isValid(brandId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Brand', brandId)))
    }
    try {
      const brand = await Brand.findById(brandId)
      if (!brand) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Brand', brandId)))
      }
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

function getAllBrands (brandId) {
  return new Promise(async (resolve, reject) => {
    try {
      const brands = Brand.find().populate('image', 'url', 'Image')
      resolve(brands)
    } catch (error) {
      reject(error)
    }
  })
}

function deleteBrand (brandId) {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await getBrandById(brandId)
      await brand.remove()
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

function updateBrand (brandId, name, description, image) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('name', 'string', name)))
    }
    if (!description || typeof description !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('description', 'string', description)))
    }
    try {
      const brand = await getBrandById(brandId)
      if (image) {
        brand.image = image
      }
      brand.name = name
      brand.description = description
      await brand.save()

      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

function addProductToBrand (brandId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await getBrandById(brandId)
      brand.products.push(productId)
      await brand.save()
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

function removeProductFromBrand (brandId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await getBrandById(brandId)
      brand.products = brand.products.filter(product => product._id.toString() !== productId.toString())
      await brand.save()
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

function getByName (name) {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await Brand.findOne({name: name.toLowerCase()})
      if (!brand) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModel('Brand')))
      }
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createBrand,
  getByName,
  getBrandById,
  getAllBrands,
  deleteBrand,
  updateBrand,
  addProductToBrand,
  removeProductFromBrand
}
