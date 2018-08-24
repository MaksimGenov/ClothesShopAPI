const create = require('./create-user.service')
const getById = require('./get-user-by-id.service')
const getByName = require('./get-user-by-name.service')

module.exports = {
  create,
  getById,
  getByName
}
