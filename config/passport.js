const passport = require('passport')
const settings = require('../config/settings')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('mongoose').model('User')

module.exports = app => {
  let options = {}
  options.jwtFromRequest = ExtractJwt.fromHeader('authorization')
  options.secretOrKey = settings.development.JWTSecret
  passport.use(new JwtStrategy(options, async function (token, done) {
    try {
      const user = await User.find({username: token.username})
      if (!user) { return done('Invalid credentials!', false) }
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }))
  app.use(passport.initialize())
}
