const imageServices = require('../../images/image-services')
const brandServices = require('../services/index-brand.service')

module.exports = async function updateBrand (req, res, next) {
  const brandId = req.params.id
  const { name, description } = req.body
  let files = req.files
  let image = null
  try {
    let brand = await brandServices.getById(brandId)
    if (files) {
      image = await imageServices.create(files.image)
      const oldImageId = brand.image
      await imageServices.remove(oldImageId)
    }
    brand = await brandServices.edit(brandId, name, description, image)

    res.json(brand)
  } catch (error) {
    next(error)
  }
}
