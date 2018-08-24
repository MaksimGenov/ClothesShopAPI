const getBrandById = require('./get-brand-by-id.service')

module.exports = function addProductToBrand (brandId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let brand = await getBrandById(brandId)
      brand.products.push(productId)
      await brand.save()
      resolve(brand)
    } catch (error) {
      reject(error)
    }
  })
}
