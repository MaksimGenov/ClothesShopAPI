const Brand = require('mongoose').model('Brand')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getByName (name) {
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
