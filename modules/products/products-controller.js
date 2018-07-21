const Product = require('mongoose').model('Product')
const Brand = require('mongoose').model('Brand')
const Category = require('mongoose').model('Category')
const path = require('path')

async function create (req, res, next) {
  let { brand, model, description, price, categories } = req.body
  categories = JSON.parse(categories)
  let imagesRelativePaths = []
  let imagesPromise = Object.keys(req.files).map(key => {
    const fileName = Date.now() + req.files[key].name
    const imageRelativePath = 'http://localhost:5000/public/images/' + fileName
    const imageAbsolutePath = path.join(__dirname, '../../public/images/' + fileName)
    imagesRelativePaths.push(imageRelativePath)
    return req.files[key].mv(imageAbsolutePath)
  })

  try {
    await Promise.all(imagesPromise)
    let product = await Product.create({
      categories,
      brand,
      model,
      description,
      price: +price,
      imagesPath: imagesRelativePaths
    })

    let updateCategories = categories.map(name => Category.findOneAndUpdate({name: name}, {$push: {'products': product._id}}))

    await Promise.all(updateCategories)
    await Brand.findOneAndUpdate({name: brand}, { $push: {'products': product._id} })

    res.json(product)
  } catch (err) {
    next(err)
  }
}

async function getAll (req, res, next) {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

async function getCount (req, res, next) {
  try {
    const count = await Product.count()
    res.json(count)
  } catch (error) {
    next(error)
  }
}

async function getById (req, res, next) {
  const id = req.params.id
  try {
    const product = await Product.findById(id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

async function search (req, res, next) {
  const {sort, ...rest} = req.query
  try {
    let products = await Product.find({...rest}).sort(sort)
    res.json(products)
  } catch (error) {
    next(error)
  }
}

module.exports = { create, getAll, getCount, getById, search }
