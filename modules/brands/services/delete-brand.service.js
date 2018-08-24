const getBrandById = require('./get-brand-by-id.service')

module.exports = function deleteBrand (brandId) {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await getBrandById(brandId)
      await brand.remove()
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}
