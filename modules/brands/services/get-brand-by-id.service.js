const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getBrandById (brandId) {
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
