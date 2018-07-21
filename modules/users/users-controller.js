const User = require('mongoose').model('User')
const Cart = require('mongoose').model('Cart')
const encryption = require('../../utils/encryption')
const jwt = require('jsonwebtoken')
const settings = require('../../config/settings')
const validUsernameRegex = /^[a-zA-Z]\w{2,20}$/
const validPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/

async function register (req, res, next) {
  const { password, username, repeatPassword } = req.body

  if (!validUsernameRegex.test(username) || !validPasswordRegex.test(password) || password !== repeatPassword) {
    return res.json({error: 'passwords does not match!'})
  }

  const salt = encryption.generateSalt()
  const hashedPassword = encryption.generateHash(salt, password)

  try {
    let cart = await Cart.create({})
    let user = await User.create({hashedPassword, salt, username, cart})
    await Cart.findByIdAndUpdate(cart._id, {$set: {user: user._id}})
    const token = generateJWT({ username: user.username })
    const userData = {
      token,
      username,
      roles: user.roles,
      cartId: cart._id
    }
    res.json({userData})
  } catch (error) {
    res.json({error: 'Username already exist!'})
    // next(error)
    console.log(error)
  }
}

async function login (req, res, next) {
  let { username, password } = req.body
  try {
    let user = await User.findOne({ username })
    if (!user) { return res.status(401).json({ error: 'Invalid credentials!' }) }
    if (!user.comparePasswords(password)) { return res.status(401).json({ error: 'Invalid credentials!' }) }
    const token = generateJWT({ username: user.username })
    const userData = {
      token,
      username,
      roles: user.roles,
      cartId: user.cart
    }
    res.json({userData})
  } catch (error) {
    next(error)
  }
}

async function findById (req, res, next) {
  const id = req.params.id
  try {
    const user = await User.findById(id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}

async function findByQuery (req, res, next) {
  const query = req.query
  try {
    const users = await User.find(query)
    res.json(users)
  } catch (error) {
    next(error)
  }
}

function update (req, res, next) {
  const id = req.params.id

  User.findByIdAndUpdate(id)
}

function generateJWT (rawToken) {
  return jwt.sign(rawToken, settings.development.JWTSecret)
}

module.exports = { register, login, findById, update, findByQuery }
