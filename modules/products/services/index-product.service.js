const create = require('./create-product.service')
const edit = require('./edit-product.service')
const remove = require('./delete-product.service')
const removeCategory = require('./remove-category.service')
const getById = require('./get-product-by-id.service')
const getPublic = require('./get-public-product.service')
const getAll = require('./get-all-products.service')
const addCart = require('./add-cart-to-product.service')
const removeCart = require('./remove-cart-from-product.service')

module.exports = {
  create,
  edit,
  delete: remove,
  removeCategory,
  getById,
  getPublic,
  getAll,
  addCart,
  removeCart
}
