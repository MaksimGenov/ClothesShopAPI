const Category = require('mongoose').model('Category')

module.exports = function getAllCategories () {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await Category.find().populate('image')
      resolve(categories)
    } catch (error) {
      reject(error)
    }
  })
}
