const getProductById = require('./get-product-by-id.service')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function editProduct (productId, brand, model, description, price, categories, color, images) {
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

    try {
      let product = await getProductById(productId)
      product.brand = brand
      product.categories = categories
      product.model = model
      product.description = description
      product.color = color
      product.price = price
      product.images = product.images.concat(images)
      await product.save()
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
