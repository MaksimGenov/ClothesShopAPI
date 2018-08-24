const brandServices = require('../services/index-brand.service')
const imageServices = require('../../images/image-services')

module.exports = async function createBrand (req, res, next) {
  const { name, description } = req.body
  let file = req.files.image
  let image
  try {
    image = await imageServices.create(file)
    const brand = await brandServices.create(name, description, image)
    res.json(brand)
  } catch (error) {
    if (image) {
      imageServices.remove(image.id)
    }
    next(error)
  }
}
