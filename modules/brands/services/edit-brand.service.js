const getBrandById = require('./get-brand-by-id.service')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function updateBrand (brandId, name, description, image) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('name', 'string', name)))
    }
    if (!description || typeof description !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('description', 'string', description)))
    }
    try {
      const brand = await getBrandById(brandId)
      if (image) {
        brand.image = image
      }
      brand.name = name
      brand.description = description
      await brand.save()

      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}
