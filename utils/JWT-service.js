const jwt = require('jsonwebtoken')
const settings = require('../config/settings')

function generateJWT (rawToken) {
  return jwt.sign(rawToken, settings.development.JWTSecret)
}

function verifyJWT (token) {
  return jwt.verify(token, settings.development.JWTSecret)
}

module.exports = {
  generateJWT,
  verifyJWT
}
