const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = async function updateName (categoryId, name) {
  return new Promise(async (resolve, reject) => {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return reject(new TypeError(`Invalid category id: ${categoryId}`))
    }

    if (!name || typeof name !== 'string') {
      return reject(new TypeError('Invalid data: name is required and should be string!'))
    }

    try {
      const category = await Category.findByIdAndUpdate(categoryId, {$set: {name}}, {new: true})
      if (!category) {
        return reject(new ReferenceError(`Category with id: ${categoryId} does not exist.`))
      }
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
