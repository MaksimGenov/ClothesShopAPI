const Brand = require('../../models/Brand')
const Product = require('mongoose').model('Product')
const Category = require('mongoose').model('Category')
const path = require('path')
const fs = require('fs')

async function create (req, res, next) {
  const { name, description } = req.body
  const image = req.files.image
  if (!name || !description || !image) {
    return res.json({error: 'Invalid data'})
  }
  const filename = Date.now() + image.name
  const imageUrl = 'http://localhost:5000/public/images/' + filename
  const imageAbsolutePath = path.join(__dirname, '../../public/images/' + filename)
  try {
    await image.mv(imageAbsolutePath)
    const brand = await Brand.create({name, description, imageUrl})
    res.json(brand)
  } catch (error) {
    fs.unlink(imageAbsolutePath)
    next(error)
  }
}

async function getAll (req, res, next) {
  try {
    const brands = await Brand.find()
    res.json(brands)
  } catch (error) {
    next(error)
  }
}

async function getById (req, res, next) {
  const id = req.params.id
  try {
    const brand = await Brand.findById(id).populate('products')
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

async function getCount (req, res, next) {
  try {
    res.json(await Brand.count())
  } catch (error) {
    next(error)
  }
}

async function remove (req, res, next) {
  const id = req.params.id
  try {
    const brand = await Brand.findById(id)
    const products = await Product.find({brand: brand.name})
    let updateCategories = []
    products.forEach(product => {
      const categories = product.categories
      categories.forEach(category => updateCategories.push(Category.update({name: category}, {$pull: {products: product._id}})))
    })
    Promise.all(updateCategories)
    await Product.remove({brand: brand.name})
    await Brand.findByIdAndRemove(id)
    res.json({message: 'Deleted Successfully'})
  } catch (error) {
    next(error)
  }
}

module.exports = {create, getAll, getById, getCount, remove}
