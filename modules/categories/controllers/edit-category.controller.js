const categoryServices = require('../services/index-category.service')
const imageServices = require('../../images/image-services')

module.exports = async function updateCategory (req, res, next) {
  const categoryId = req.params.id
  const name = req.body.name
  let files = req.files
  let newImage

  try {
    let category = await categoryServices.getById(categoryId)
    if (files) {
      let oldImage = category.image
      await imageServices.remove(oldImage)
      newImage = await imageServices.create(files.image)
    }
    category = await categoryServices.edit(categoryId, name, newImage)
    res.json(category)
  } catch (error) {
    next(error)
  }
}
