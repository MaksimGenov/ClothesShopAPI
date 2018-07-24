const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const Image = mongoose.model('Image')
const Brand = mongoose.model('Brand')
const Category = mongoose.model('Category')
const Cart = mongoose.model('Cart')
const imageServices = require('../../images/image-services')

function remove (id) {
  return new Promise(async (resolve, reject) => {
    const productId = id
    if (!mongoose.Types.ObjectId.isValid(productId)) { reject(new Error('Invalid id!')) }

    try {
      const product = await Product.findById(productId)
      if (!product) {
        return reject(new Error(`Product with id: "${productId}" does not exist!`))
      }
      const brandId = product.brand
      await Brand.findByIdAndUpdate(brandId, {$pull: {'products': productId}})

      let categoryIds = product.categories
      await Promise.all(categoryIds.map(id => Category.findByIdAndUpdate(id, {$pull: {'products': productId}})))

      let imageIds = product.images
      let images = await Image.find({'_id': {$in: imageIds}})
      await Promise.all(images.map(image => imageServices.remove(image)))

      let cartsToUpdate = await Cart.find({products: productId})
      await Promise.all(cartsToUpdate.map(cart => Cart.findByIdAndUpdate(cart._id, {$pull: {'products': productId}})))

      await Product.findByIdAndRemove(productId)
      resolve({message: 'Product deleted successfully!'})
    } catch (error) {
      reject(error)
    }
  })
}

function update (id, brand, model, description, price, categories, color, files) {
  return new Promise(async (resolve, reject) => {
    const productId = id

    if (!mongoose.Types.ObjectId.isValid(productId)) { return reject(new Error('Invalid id!')) }

    if (!brand || typeof brand !== 'string') {
      return reject(new Error('Invalid data: brand is required and should be a string'))
    }

    if (!model || typeof model !== 'string') {
      return reject(new Error('Invalid data: model is required and should be a string'))
    }

    if (!description || typeof description !== 'string') {
      return reject(new Error('Invalid data: description is required and should be a string'))
    }

    if (!price || isNaN(price)) {
      return reject(new Error('Invalid data: price is required and should be a number'))
    }

    if (!color || typeof color !== 'string') {
      return reject(new Error('Invalid data: color is required and should be a string'))
    }

    try {
      categories = JSON.parse(categories)
    } catch (error) {
      return reject(new Error('Invalid data: categories should be JSON array'))
    }

    try {
      let product = await Product.findById(productId)

      if (!product) {
        return reject(new Error(`Product with id: ${productId} does not exist!`))
      }

      await Brand.findByIdAndUpdate(product.brand, {$pull: {products: productId}})
      await Category.updateMany({_id: {$in: product.categories}}, {$pull: {products: productId}})

      let newBrand = await Brand.findOne({name: brand})
      let newCategories = await Category.find({name: {$in: categories}})
      let images = await Promise.all(Object.keys(files).map(key => imageServices.create(files[key])))
      images = images.map(i => i._id).concat(product.images)
      product = {
        brand: newBrand,
        categories: newCategories,
        model,
        description,
        color,
        price: +price,
        images
      }

      await Brand.findByIdAndUpdate(product.brand, {$push: {products: productId}})
      await Category.updateMany({_id: {$in: product.categories}}, {$push: {products: productId}})

      product = await Product
        .findByIdAndUpdate(productId, {$set: product}, {new: true})
        .populate({path: 'categories', model: 'Category', select: 'name'})
        .populate({path: 'brand', model: 'Brand', select: 'name'})
        .populate({path: 'images', model: 'Image', select: 'url'})
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {remove, update}
