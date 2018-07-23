const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const Brand = mongoose.model('Brand')
const Category = mongoose.model('Category')
const imageServices = require('../../images/image-services')

module.exports = async function update (req, res, next) {
  const productId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400)
    return res.json({ error: 'Invalid id' })
  }

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

  try {
    let product = await Product.findById(productId)

    if (!product) {
      res.status(400)
      return res.json({error: `Product with id: ${productId} does not exist!`})
    }

    await Brand.findByIdAndUpdate(product.brand, {$pull: {products: productId}})
    await Category.updateMany({_id: {$in: product.categories}}, {$pull: {products: productId}})

    let newBrand = await Brand.findOne({name: brand})
    let newCategories = await Category.find({name: {$in: categories}})
    let files = req.files || []
    let images = await Promise.all(Object.keys(files).map(key => imageServices.create(files[key])))
    images = images.map(i => i._id).concat(product.images)
    product = {
      brand: newBrand,
      categories: newCategories,
      model,
      description,
      color,
      price: +price,
      images
    }

    await Brand.findByIdAndUpdate(product.brand, {$push: {products: productId}})
    await Category.updateMany({_id: {$in: product.categories}}, {$push: {products: productId}})

    product = await Product
      .findByIdAndUpdate(productId, {$set: product}, {new: true})
      .populate({path: 'categories', model: 'Category', select: 'name'})
      .populate({path: 'brand', model: 'Brand', select: 'name'})
      .populate({path: 'images', model: 'Image', select: 'url'})
    res.json(product)
  } catch (error) {
    next(error)
  }
}
