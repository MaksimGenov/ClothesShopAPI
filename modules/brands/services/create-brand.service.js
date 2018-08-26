const errorMsgGenerator = require('../../../utils/errorMessageGenerator')
const Brand = require('mongoose').model('Brand')

module.exports = function createBrand (name, description, image) {
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
      const brand = await Brand.create({name: name.toLocaleLowerCase(), description, image})
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}
