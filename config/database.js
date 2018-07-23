const mongoose = require('mongoose')
require('../models/ShippingAddress')
require('../models/Product')
require('../models/Size')
require('../models/Brand')
require('../models/Cart')
require('../models/Category')
require('../models/Image')
const User = require('../models/User')

module.exports = async (settings) => {
  try {
    await mongoose.connect(settings.development.db)
    User.seedAdminUser()
    console.log('Database ready...')
  } catch (error) {
    throw error
  }
}
