const Category = require('../../models/Category')

async function create (req, res, next) {
  const {name} = req.body
  try {
    const category = await Category.create({name})
    res.json(category)
  } catch (error) {
    next(error)
  }
}

async function findAll (req, res, next) {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (error) {
    next(error)
  }
}

async function findById (req, res, next) {
  const id = req.params.id
  try {
    const category = await Category.findById(id).populate('products')
    res.json(category)
  } catch (error) {
    next(error)
  }
}

module.exports = {create, findAll, findById}
