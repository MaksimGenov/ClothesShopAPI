const Category = require('mongoose').model('Category')

module.exports = async function create (req, res, next) {
  const {name} = req.body

  if (!name || typeof name !== 'string') {
    res.status(400)
    return res.json({error: 'Invalid data: name is required and should be string!'})
  }

  try {
    const category = await Category.create({name})
    res.json(category)
  } catch (error) {
    next(error)
  }
}
