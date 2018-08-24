const mongoose = require('mongoose')
const User = mongoose.model('User')
const errorMsgGenerator = require('../../../utils/errorMessageGenerator')

module.exports = function getUserById (id) {
  return new Promise(async (resolve, reject) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('User', id)))
    }

    try {
      const user = await User.findById(id)
      resolve(user)
    } catch (error) {
      reject(error)
    }
  })
}
