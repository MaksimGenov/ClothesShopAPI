const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const errorMsgGenerator = require('../../utils/errorMessageGenerator')

function createProduct (brandId, model, description, price, categoriesIds, color, images) {
  return new Promise(async (resolve, reject) => {
    if (!model || typeof model !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('model', 'string', model)))
    }

    if (!description || typeof description !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('description', 'string', description)))
    }

    if (!price || isNaN(price)) {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('price', 'number', price)))
    }

    if (!color || typeof color !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('color', 'string', color)))
    }

    if (!images) {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('images', 'file', images)))
    }

    try {
      const product = new Product({
        categories: categoriesIds,
        brand: brandId,
        model,
        description,
        color,
        price: +price,
        images
      })
      await product.save()
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

function getProductById (productId) {
  return new Promise(async (resolve, reject) => {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Product', productId)))
    }
    try {
      const product = await Product.findById(productId)
      if (!product) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Product', productId)))
      }
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

function getAllProducts () {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product
        .find()
        .populate({path: 'categories', model: 'Category', select: 'name'})
        .populate({path: 'brand', model: 'Brand', select: 'name'})
        .populate({path: 'images', model: 'Image', select: 'url'})
        .select('-carts')
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

function deleteProduct (productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await getProductById(productId)
      await product.remove()
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

function updateProduct (productId, brand, model, description, price, categories, color, images) {
  return new Promise(async (resolve, reject) => {
    if (!model || typeof model !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('model', 'string', model)))
    }

    if (!description || typeof description !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('description', 'string', description)))
    }

    if (!price || isNaN(price)) {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('price', 'number', price)))
    }

    if (!color || typeof color !== 'string') {
      return reject(new TypeError(errorMsgGenerator.invalidDataMsg('color', 'string', color)))
    }

    try {
      let product = await getProductById(productId)
      product.brand = brand
      product.categories = categories
      product.model = model
      product.description = description
      product.color = color
      product.price = price
      product.image.concat(images)
      await product.save()
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

function addCartToProduct (productId, cartId) {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await getProductById(productId)
      product.carts.push(cartId)
      await product.save()
      resolve('Cart added to product.')
    } catch (error) {
      reject(error)
    }
  })
}

function removeCartFromProduct (productId, cartId) {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await getProductById(productId)
      product.carts = product.carts.filter(id => id !== cartId)
      await product.update()
      resolve('Cart removed from product.')
    } catch (error) {
      reject(error)
    }
  })
}

function removeCategoryFromProduct (productId, categoryId) {
  return new Promise(async (resolve, reject) => {
    try {
      let product = getProductById(productId)
      product.categories = product.categories.filter(category => category.id !== categoryId)
      await product.save()
      resolve('Category removed from product.')
    } catch (error) {
      reject(error)
    }
  })
}

function getPopulatedProduct (productId) {
  return new Promise(async (resolve, reject) => {
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return reject(new TypeError(errorMsgGenerator.invalidIdMsg('Product', productId)))
    }
    try {
      let product = await Product.findById(productId)
        .populate({path: 'categories', model: 'Category', select: 'name'})
        .populate({
          path: 'brand',
          select: 'image name',
          model: 'Brand',
          populate: {path: 'image', select: 'url', model: 'Image'}
        })
        .populate({path: 'images', model: 'Image', select: 'url'})
        .select('-carts')
      if (!product) {
        return reject(new ReferenceError(errorMsgGenerator.unexistingModelId('Product', productId)))
      }
      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  updateProduct,
  addCartToProduct,
  removeCartFromProduct,
  removeCategoryFromProduct,
  getPopulatedProduct
}
