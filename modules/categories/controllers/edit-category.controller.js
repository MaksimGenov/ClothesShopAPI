const categoryServices = require('../services/index-category.service')
const imageServices = require('../../images/image-services')

module.exports = async function updateCategory (req, res, next) {
  const categoryId = req.params.id
  const name = req.body.name
  let newImage = req.files.image

  try {
    let category = await categoryServices.getById(categoryId)
    if (newImage) {
      let oldImage = category.image
      await imageServices.remove(oldImage)
      newImage = await imageServices.create(newImage)
    }
    category = await categoryServices.edit(categoryId, name, newImage)
    res.json(category)
  } catch (error) {
    next(error)
  }
}
