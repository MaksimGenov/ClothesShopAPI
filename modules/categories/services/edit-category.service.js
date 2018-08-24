const getCategoryById = require('./get-category-by-id.service')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function updateCategory (categoryId, name, image) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('name', 'string', name)))
    }
    try {
      let category = await getCategoryById(categoryId)
      category.name = name
      if (image) {
        category.image = image
      }
      await category.save()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
