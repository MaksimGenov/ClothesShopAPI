const getCategoryById = require('./get-category-by-id.service')

module.exports = function addProductToCategory (categoryId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await getCategoryById(categoryId)
      category.products.push(productId)
      await category.save()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
