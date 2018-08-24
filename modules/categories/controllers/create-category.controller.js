const categoryServices = require('../services/index-category.service')
const imageService = require('../../images/image-services')

module.exports = async function createCategory (req, res, next) {
  const {name} = req.body
  const file = req.files.image
  let image
  try {
    image = await imageService.create(file)
    const category = await categoryServices.create(name, image)
    res.json(category)
  } catch (error) {
    if (image) {
      await imageService.remove(image)
    }
    next(error)
  }
}
