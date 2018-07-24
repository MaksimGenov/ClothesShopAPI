const mongoose = require('mongoose')
const Brand = mongoose.model('Brand')
const Product = mongoose.model('Product')
const Category = mongoose.model('Category')
const imageServices = require('../../images/image-services')

module.exports = async function remove (req, res, next) {
  const brandId = req.params.id

  if (!brandId && !mongoose.Types.ObjectId.isValid(brandId)) {
    res.status(400)
    return res.json({error: 'Invalid id!'})
  }

  try {
    const brandToDelete = await Brand.findById(brandId)

    if (!brandToDelete) {
      res.status(400)
      res.json({error: `Brand with id: "${brandId}" does not exist`})
    }

    let productsToDelete = await Product.find({_id: {$in: brandToDelete.products}}).populate('images')
    let imagesToDelete = productsToDelete.reduce((accumulator, product) => accumulator.concat(product.images), [])
    let categoriesToUpdateIds = productsToDelete
      .reduce((accumulator, product) => {
        product.categories.forEach(categoryId => {
          const idAsString = categoryId.toString()
          if (!accumulator.includes(idAsString)) { accumulator.push(idAsString) }
        })
        return accumulator
      }, [])

    let categoryModelsToUpdate = await Promise.all(categoriesToUpdateIds.map(id => Category.findById(id)))
    productsToDelete = productsToDelete.map(product => product.id)
    categoryModelsToUpdate = categoryModelsToUpdate.map(category => {
      let categoryProductsIds = category.products.map(product => product._id.toString())
      productsToDelete.forEach(productId => {
        if (categoryProductsIds.includes(productId)) {
          const index = categoryProductsIds.indexOf(productId)
          categoryProductsIds = categoryProductsIds.slice(index)
        }
      })
      return Category.findByIdAndUpdate(category._id, {$set: {products: categoryProductsIds}})
    })

    await Promise.all(categoryModelsToUpdate)
    await Promise.all(productsToDelete.map(id => Product.findByIdAndRemove(id)))
    await Promise.all(imagesToDelete.map(image => imageServices.remove(image)))
    await Brand.findByIdAndRemove(brandId)

    res.json({message: "Brand and all of it's products deleted!"})
  } catch (error) {
    next(error)
  }
}
