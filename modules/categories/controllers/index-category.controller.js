const create = require('./create-category.controller')
const get = require('./get-category.controller')
const getAll = require('./get-all-categories.controller')
const getProducts = require('./get-category-products.controller')
const remove = require('./delete-category.controller')
const edit = require('./edit-category.controller')

module.exports = {
  create,
  get,
  getAll,
  getProducts,
  edit,
  delete: remove
}
