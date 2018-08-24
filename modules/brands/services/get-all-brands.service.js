const Brand = require('mongoose').model('Brand')

module.exports = function getAllBrands (brandId) {
  return new Promise(async (resolve, reject) => {
    try {
      const brands = Brand.find().populate('image', 'url', 'Image')
      resolve(brands)
    } catch (error) {
      reject(error)
    }
  })
}
