const crypto = require('crypto')

function generateHash (salt, value) {
  return crypto.createHmac('sha256', salt + value).digest().toString('hex')
}

function generateSalt () {
  return crypto.randomBytes(128).toString('hex')
}

module.exports = {generateHash, generateSalt}
