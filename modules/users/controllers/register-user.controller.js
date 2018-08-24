const cartServices = require('../../cart/services/index-cart.service')
const userServices = require('../services/index-user.service')
const JwtServices = require('../../../utils/JWT-service')

module.exports = async function register (req, res, next) {
  const { password, username, repeatPassword } = req.body

  try {
    let user = await userServices.getByName(username)
    if (user) {
      res.status(409)
      return res.end('Username already exist!')
    }
    let cart = await cartServices.create()
    user = await userServices.create(username, password, repeatPassword, cart._id)
    const token = JwtServices.generateJWT({ username: user.username })
    const userData = {
      token,
      username,
      roles: user.roles,
      cartId: cart._id
    }
    res.json({...userData})
  } catch (error) {
    next(error)
  }
}
