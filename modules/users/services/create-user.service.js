const User = require('mongoose').model('User')
const encryption = require('../../../utils/encryption')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

const validUsernameRegex = /^[a-zA-Z]\w{2,20}$/
const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/

module.exports = function createUser (username, password, repeatPassword, cartId) {
  return new Promise(async (resolve, reject) => {
    if (password !== repeatPassword || !validUsernameRegex.test(username) || !validPasswordRegex.test(password)) {
      return reject(new EvalError(errorMsgGenerator.invalidRegisterData()))
    }
    try {
      const salt = encryption.generateSalt()
      const hashedPassword = encryption.generateHash(salt, password)
      const user = await User.create({ username, hashedPassword, salt, cart: cartId })
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}
