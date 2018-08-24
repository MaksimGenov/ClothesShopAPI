const create = require('./create-brand.controller')
const getById = require('./get-brand-by-id.controller')
const getAll = require('./get-all-brands.controller')
const getProducts = require('./get-brand-products.controller')
const edit = require('./edit-brand.controller')
const remove = require('./delete-brand.controller')

module.exports = {
  create,
  getById,
  getAll,
  getProducts,
  edit,
  delete: remove
}
