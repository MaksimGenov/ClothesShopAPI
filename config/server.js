const fileupload = require('express-fileupload')
const cors = require('../utils/cors')

module.exports = app => {
  app.use(cors)
  app.use(fileupload())
}
