const mongoose = require('mongoose')
const Product = mongoose.model('Product')

module.exports = async function getAllProducts () {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product
        .find()
        .populate({path: 'categories', model: 'Category', select: 'name'})
        .populate({path: 'brand', model: 'Brand', select: 'name'})
        .populate({path: 'images', model: 'Image', select: 'url'})
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}
