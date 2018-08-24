const getCategoryById = require('./get-category-by-id.service')

module.exports = function removeProductFromCategory (categoryId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await getCategoryById(categoryId)
      category.products = category.products.filter(id => id.toString() !== productId.toString())
      await category.save()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
