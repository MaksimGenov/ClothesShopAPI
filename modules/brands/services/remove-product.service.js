const getBrandById = require('./get-brand-by-id.service')

module.exports = function removeProductFromBrand (brandId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await getBrandById(brandId)
      brand.products = brand.products.filter(product => product._id.toString() !== productId.toString())
      await brand.save()
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}
