const get = require('./get-product.controller')
const getAll = require('./get-all-products.controller')
const create = require('./create-product.controller')
const remove = require('./delete-product.controller')
const edit = require('./edit-product.controller')

module.exports = {
  get,
  getAll,
  create,
  edit,
  delete: remove
}
