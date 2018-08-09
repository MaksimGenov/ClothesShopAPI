const brandServices = require('./brand-services')
const imageServices = require('../images/image-services')
const productServices = require('../products/product-services')
const categoryServices = require('../categories/category-services')
const cartServices = require('../cart/cart-services')

async function createBrand (req, res, next) {
  const { name, description } = req.body
  let file = req.files.image
  let image
  try {
    image = await imageServices.create(file)
    const brand = await brandServices.createBrand(name, description, image)
    res.json(brand)
  } catch (error) {
    if (image) {
      imageServices.remove(image.id)
    }
    next(error)
  }
}

async function getBrandById (req, res, next) {
  const brandId = req.params.id
  try {
    const brand = await brandServices.getBrandById(brandId)
    res.json(brand)
  } catch (error) {
    next(error)
  }
}

async function getAllBrands (req, res, next) {
  try {
    const brands = await brandServices.getAllBrands()
    res.json(brands)
  } catch (error) {
    next(error)
  }
}

async function deleteBrand (req, res, next) {
  const brandId = req.params.id
  try {
    const brand = await brandServices.deleteBrand(brandId)
    let brandImageToDelete = brand.image
    await imageServices.remove(brandImageToDelete)

    let productsToDeleteIds = brand.products || []
    let deletedProducts = await Promise.all(productsToDeleteIds.map(productServices.deleteProduct))
    let categoriesToUpdate = []
    let cartsToUpdate = []

    for (const product of deletedProducts) {
      const categories = product.categories
      for (const categoryId of categories) {
        categoriesToUpdate.push(categoryServices.removeProductFromCategory(categoryId, product.id))
        cartsToUpdate.push(cartServices.removeProductFromCart(categoryId, product.id))
      }
    }

    await Promise.all(categoriesToUpdate)
    await Promise.all(cartsToUpdate)
    res.json({message: `Brand: ${brand.name} and all of it's products deleted.`})
  } catch (error) {
    next(error)
  }
}

async function updateBrand (req, res, next) {
  const brandId = req.params.id
  const { name, description } = req.body
  let image = req.files.image
  try {
    let brand = await brandServices.getBrandById(brandId)
    if (image) {
      image = await imageServices.create(image)
      const oldImageId = brand.image
      await imageServices.remove(oldImageId)
    }
    brand = await brandServices.updateBrand(brandId, name, description, image)

    res.json(brand)
  } catch (error) {
    next(error)
  }
}

async function getBrandProducts (req, res, next) {
  const brandId = req.params.id
  try {
    const brand = await brandServices.getBrandById(brandId)
    const products = await Promise.all(brand.products.map(productId => productServices.getPopulatedProduct(productId)))
    res.json(products)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBrand,
  getBrandById,
  getAllBrands,
  getBrandProducts,
  deleteBrand,
  updateBrand
}
