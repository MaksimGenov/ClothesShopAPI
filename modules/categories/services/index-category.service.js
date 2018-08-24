const getById = require('./get-category-by-id.service')
const getAll = require('./get-all-categories.service')
const getByName = require('./get-category-by-name.service')
const remove = require('./delete-category.service')
const edit = require('./edit-category.service')
const addProduct = require('./add-product.service')
const removeProduct = require('./remove-product.service')
const create = require('./create-category.service')

module.exports = {
  getById,
  getByName,
  getAll,
  delete: remove,
  edit,
  addProduct,
  removeProduct,
  create
}
