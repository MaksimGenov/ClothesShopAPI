const Category = require('mongoose').model('Category')

module.exports = function getAll () {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await Category.find().populate('products')
      resolve(categories)
    } catch (error) {
      reject(error)
    }
  })
}
