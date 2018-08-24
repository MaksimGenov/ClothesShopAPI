const Category = require('mongoose').model('Category')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getByName (name) {
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
