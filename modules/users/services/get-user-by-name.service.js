const mongoose = require('mongoose')
const User = mongoose.model('User')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getUserByName (name) {
  return new Promise(async (resolve, reject) => {
    if (typeof name !== 'string') {
      return reject(new TypeError(errorMsgGenerator.unexistingModel('User')))
    }

    try {
      const user = await User.findOne({username: name})
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}
