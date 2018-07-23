const mongoose = require('mongoose')
const Category = mongoose.model('Category')

module.exports = async function update (req, res, next) {
  const categoryId = req.params.id

  if (!categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400)
    return res.json({error: 'Invalid id!'})
  }

  const {name} = req.body

  if (!name || typeof name !== 'string') {
    res.status(400)
    return res.json({error: 'Invalid data: name is required and should be string!'})
  }

  try {
    const category = await Category.findByIdAndUpdate(categoryId, {$set: {name}}, {new: true})
    res.json(category)
  } catch (error) {
    next(error)
  }
}
