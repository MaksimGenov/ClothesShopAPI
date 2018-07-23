const Image = require('mongoose').model('Image')
const fs = require('fs')
const path = require('path')

function remove (image) {
  return new Promise((resolve, reject) => {
    fs.unlink(image.path, async () => {
      // if (error) { return reject(error) }

      try {
        await Image.findByIdAndRemove(image._id)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
}

function create (file) {
  return new Promise((resolve, reject) => {
    const fileName = Date.now() + file.name
    const imageUrl = 'http://localhost:5000/public/images/' + fileName
    const imagePath = path.join(__dirname, '../../public/images/' + fileName)
    file.mv(imagePath, async (error) => {
      if (error) { reject(error) }
      try {
        resolve(await Image.create({ url: imageUrl, path: imagePath }))
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { remove, create }
