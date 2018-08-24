const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function createProduct (brandId, model, description, price, categoriesIds, color, images) {
  return new Promise(async (resolve, reject) => {
    if (!model || typeof model !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('model', 'string', model)))
    }

    if (!description || typeof description !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('description', 'string', description)))
    }

    if (!price || isNaN(price)) {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('price', 'number', price)))
    }

    if (!color || typeof color !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('color', 'string', color)))
    }

    if (!images) {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('images', 'file', images)))
    }

    try {
      const product = new Product({
        categories: categoriesIds,
        brand: brandId,
        model: model.toLowerCase(),
        description,
        color: color.toLowerCase(),
        price: +price,
        images
      })
      await product.save()
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
