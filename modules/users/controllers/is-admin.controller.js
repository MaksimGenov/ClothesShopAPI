module.exports = function isAdmin (req, res, next) {
  if (req.user.roles.includes('admin')) {
    return next()
  }

  res.status(401).end('Unauthorized')
}
