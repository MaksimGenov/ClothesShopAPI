const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = async function getCategory (categoryId) {
  return new Promise(async (resolve, reject) => {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(`Invalid category id: ${categoryId}`))
    }

    try {
      const category = await Category.findById(categoryId).populate('products')
      if (!category) {
        return reject(new ReferenceError(`Category with id: ${categoryId} does not exist.`))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
