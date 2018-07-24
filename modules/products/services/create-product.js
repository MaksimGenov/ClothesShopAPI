const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const imageServices = require('../../images/image-services')
const brandServices = require('../../brands/services/index')
const categoryServices = require('../../categories/services/index')

module.exports = async function createProduct (brandId, model, description, price, categoriesIds, color, images) {
  return new Promise(async (resolve, reject) => {
    if (!brandId || !mongoose.Types.ObjectId.isValid(brandId)) {
      return reject(new TypeError(`Invalid brand id: [${brandId}]`))
    }

    if (!model || typeof model !== 'string') {
      return reject(new TypeError(`Invalid data: [${model}]! Model is required and should be a string`))
    }

    if (!description || typeof description !== 'string') {
      return reject(new TypeError(`Invalid data: [${description}]! Description is required and should be a string`))
    }

    if (!price || isNaN(price)) {
      return reject(new TypeError(`Invalid data: [${price}]! Price is required and should be a number`))
    }

    if (!color || typeof color !== 'string') {
      return reject(new TypeError(`Invalid data: [${color}]! Color is required and should be a number`))
    }

    if (!validateCategoryIds(categoriesIds)) {
      return reject(new TypeError(`Invalid data: [${categoriesIds}]! Categories are required and should be a JSON array`))
    }

    categoriesIds = JSON.parse(categoriesIds)

    let product = {}
    try {
      images = await Promise.all(Object.keys(images).map(key => imageServices.create(images[key])))

      product = await Product.create({
        categories: categoriesIds,
        brand: brandId,
        model,
        description,
        color,
        price: +price,
        images: images.map(image => image.id)
      })

      await Promise.all(categoriesIds.map(categoryId => categoryServices.addProduct(categoryId, product.id)))
      await brandServices.addProduct(brandId, product.id)
      resolve(product)
    } catch (error) {
      await Promise.all(images.map(image => imageServices.remove(image)))
      await Promise.all(categoriesIds.map(categoryId => categoryServices.removeProduct(categoryId, product.id)))
      await brandServices.removeProduct(brandId, product.id)
      reject(error)
    }
  })
}

function validateCategoryIds (categoryIds) {
  let valid = true
  try {
    categoryIds = JSON.parse(categoryIds)
    for (const categoryId of categoryIds) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        valid = false
        break
      }
    }
  } catch (error) {
    return false
  }
  return valid
}
