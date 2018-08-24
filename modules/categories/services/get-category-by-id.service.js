const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getCategoryById (categoryId) {
  return new Promise(async (resolve, reject) => {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Category', categoryId)))
    }
    try {
      const category = await Category.findById(categoryId).populate('image')
      if (!category) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Category', categoryId)))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
