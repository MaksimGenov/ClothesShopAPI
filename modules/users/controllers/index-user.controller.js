const register = require('./register-user.controller')
const login = require('./login-user.controller')
const isAdmin = require('./is-admin.controller')

module.exports = {
  register,
  login,
  isAdmin
}
