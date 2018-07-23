const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')
const imageServices = require('../../images/image-services')

module.exports = async function create (req, res, next) {
  const { name, description } = req.body

  if (!name || typeof name !== 'string') {
    res.status(400)
    return res.json({error: 'Invalid data: name is required and should be a string!'})
  }

  if (!description || typeof description !== 'string') {
    res.status(400)
    return res.json({error: 'Invalid data: description is required and should be a string!'})
  }

  let image = req.files.image

  if (!image) {
    res.status(400)
    return res.json({error: 'Invalid data: image is required'})
  }

  try {
    image = await imageServices.create(image)
    const brand = await Brand.create({name, description, image})
    res.json(brand)
  } catch (error) {
    await imageServices.remove(image)
  }
}
