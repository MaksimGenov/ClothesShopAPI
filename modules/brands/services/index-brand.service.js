const create = require('./create-brand.service')
const getById = require('./get-brand-by-id.service')
const getByName = require('./get-brand-by-name.service')
const getAll = require('./get-all-brands.service')
const addProduct = require('./add-product.service')
const removeProduct = require('./remove-product.service')
const edit = require('./edit-brand.service')
const remove = require('./delete-brand.service')

module.exports = {
  create,
  getById,
  getByName,
  getAll,
  addProduct,
  removeProduct,
  edit,
  delete: remove
}
