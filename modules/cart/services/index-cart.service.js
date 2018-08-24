const create = require('./create-cart.service')
const remove = require('./delete-cart.service')
const addProduct = require('./add-product-to-cart.service')
const removeProduct = require('./remove-product-from-cart.service')
const getById = require('./get-cart-by-id.service')

module.exports = {
  create,
  delete: remove,
  addProduct,
  removeProduct,
  getById
}
