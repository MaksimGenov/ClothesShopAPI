const usersRouter = require('../modules/users/router')
const productsRouter = require('../modules/products/router')
const brandsRouter = require('../modules/brands/router')
const categoriesRouter = require('../modules/categories/router')
const cartRouter = require('../modules/cart/router')

module.exports = (app) => {
  app.use('/api/users', usersRouter)
  app.use('/api/products', productsRouter)
  app.use('/api/brands', brandsRouter)
  app.use('/api/categories', categoriesRouter)
  app.use('/api/cart', cartRouter)
  app.use((error, req, res, next) => {
    if (error) {
      res.status(500)
      res.json({error: 'Oops something went wrong!'})
    }
  })
}
