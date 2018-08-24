const JwtServices = require('../../../utils/JWT-service')
const userServices = require('../services/index-user.service'
)
module.exports = async function login (req, res, next) {
  let { username, password } = req.body
  try {
    let user = await userServices.getByName(username)
    if (!user) { return res.status(401).end('Invalid credentials!') }
    if (!user.comparePasswords(password)) { return res.status(401).end('Invalid credentials!') }
    const token = JwtServices.generateJWT({ username: user.username })
    const userData = {
      token,
      username,
      roles: user.roles,
      cartId: user.cart
    }
    res.json({...userData})
  } catch (error) {
    next(error)
  }
}
