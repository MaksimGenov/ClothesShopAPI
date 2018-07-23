const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const Brand = mongoose.model('Brand')
const Category = mongoose.model('Category')
const imageServices = require('../../images/image-services')

module.exports = async function create (req, res, next) {
  let { brand, model, description, price, categories, color } = req.body

  if (!brand || typeof brand !== 'string') {
    res.status(400)
    res.json({ error: 'Invalid data: brand is required and should be a string' })
  }

  if (!model || typeof model !== 'string') {
    res.status(400)
    res.json({ error: 'Invalid data: model is required and should be a string' })
  }

  if (!description || typeof description !== 'string') {
    res.status(400)
    res.json({ error: 'Invalid data: description is required and should be a string' })
  }

  if (!price || isNaN(price)) {
    res.status(400)
    res.json({ error: 'Invalid data: price is required and should be a number' })
  }

  if (!color || typeof color !== 'string') {
    res.status(400)
    res.json({ error: 'Invalid data: color is required and should be a string' })
  }

  try {
    categories = JSON.parse(categories)
  } catch (error) {
    res.status(400)
    res.json({ error: 'Invalid data: categories should be JSON array' })
  }

  let categoryModels = []
  let brandModel = {}
  let product = {}
  let images = []
  try {
    brandModel = await Brand.findOne({ name: brand })
    if (!brandModel) {
      res.status(400)
      return res.json({ error: `Brand [${brand}] does not exist in database!` })
    }

    categoryModels = await Category.find({ name: { $in: categories } })
    if (categories.length !== categoryModels.length) {
      for (const model of categoryModels) {
        if (!categories.includes(model.name)) {
          const index = categories.indexOf(model.name)
          categories.splice(index)
        }
      }
      res.status(400)
      return res.json({ error: `Categories [${categories}] does not exist in database!` })
    }

    let files = req.files || []
    images = await Promise.all(Object.keys(files).map(key => imageServices.create(files[key])))

    product = await Product.create({
      categories: categoryModels,
      brand: brandModel,
      model,
      description,
      color,
      price: +price,
      images
    })

    let updateCategories = categoryModels
      .map(category => Category.findByIdAndUpdate(category._id, { $push: { 'products': product._id } }))

    await Promise.all(updateCategories)
    await Brand.findByIdAndUpdate(brandModel._id, { $push: { 'products': product._id } })
    res.json(product)
  } catch (error) {
    await Promise.all(images.map(image => imageServices.remove(image)))
    await Promise.all(categoryModels.map(category => Category.findByIdAndUpdate(category._id, { $pull: { 'products': product._id } })))
    await Brand.findByIdAndUpdate(brandModel._id, { $pull: { 'products': product._id } })
    res.status(500)
    return res.json({ error })
  }
}
