const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')
const imageServices = require('../../images/image-services')

module.exports = async function create (name, description, image) {
  return new Promise(async (resolve, reject) => {
    if (!name || typeof name !== 'string') {
      return reject(new TypeError(`Invalid data: [${name}]! Name is required and should be string!`))
    }

    if (!description || typeof description !== 'string') {
      return reject(new TypeError(`Invalid data: description is required and should be a string!`))
    }

    if (!image) {
      return reject(new TypeError('Invalid data: image is required'))
    }

    try {
      image = await imageServices.create(image)
      const brand = await Brand.create({name, description, image})
      resolve(brand)
    } catch (error) {
      await imageServices.remove(image)
      reject(error)
    }
  })
}
