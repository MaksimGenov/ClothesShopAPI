const getCategoryById = require('./get-category-by-id.service')

module.exports = function deleteCategory (categoryId) {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await getCategoryById(categoryId)
      await category.remove()
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
