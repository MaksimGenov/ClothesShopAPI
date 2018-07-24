const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = async function createCategory (name) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(`Invalid data: [${name}]! Name is required and should be string!`))
    }

    try {
      const category = await Category.create({name})
      resolve(category)
    } catch (error) {
      reject(error)
    }
  })
}
