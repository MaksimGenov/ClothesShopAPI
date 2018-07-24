const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const productServices = require('../../products/services/index')

module.exports = async function updateName (categoryId) {
  return new Promise(async (resolve, reject) => {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(`Invalid category id: ${categoryId}`))
    }

    try {
      const category = await Category.findById(categoryId)
      const productsToUpdate = category.products
      await Promise.all(productsToUpdate.map(productId => productServices.removeCategory(productId, categoryId)))
      resolve({message: 'Category deleted successfully!'})
    } catch (error) {
      reject(error)
    }
  })
}
