const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function createCategory (name, image) {
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
