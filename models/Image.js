const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  url: { type: String },
  path: { type: String }
})

mongoose.model('Image', imageSchema)
module.exports = mongoose.model('Image')
