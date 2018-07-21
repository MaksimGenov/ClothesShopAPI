const mongoose = require('mongoose')
const encryption = require('../utils/encryption')
const Cart = require('./Cart')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  salt: { type: String, required: true },
  roles: { type: Array, default: ['user'] },
  shippingAddress: { type: mongoose.SchemaTypes.ObjectId, res: 'ShippingAddress' },
  cart: { type: mongoose.SchemaTypes.ObjectId, ref: 'Cart' }
})

userSchema.methods.comparePasswords = function (password) {
  return this.hashedPassword === encryption.generateHash(this.salt, password)
}
userSchema.statics.seedAdminUser = async function () {
  try {
    const users = await this.find()
    if (users.length > 0) { return }
    let cart = await Cart.create({})
    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHash(salt, '123456')

    const user = await this.create({
      username: 'Admin',
      hashedPassword,
      salt,
      roles: ['admin'],
      cart: cart._id
    })

    await Cart.findByIdAndUpdate(cart._id, {$set: {'user': user._id}})
  } catch (error) {
    throw error
  }
}
mongoose.model('User', userSchema)

module.exports = mongoose.model('User')
