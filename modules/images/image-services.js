const Image = require('mongoose').model('Image')
const fs = require('fs')
const path = require('path')

function remove (imageId) {
  return new Promise(async (resolve, reject) => {
    const image = await Image.findById(imageId)
    fs.unlink(image.path, async (error) => {
      if (error) { return reject(error) }

      try {
        await Image.findByIdAndRemove(imageId)
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
