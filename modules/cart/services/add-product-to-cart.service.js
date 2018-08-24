const getCartById = require('./get-cart-by-id.service')

module.exports = function addProductToCart (cartId, productId) {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await getCartById(cartId)

      for (const product of cart.products) {
        if (product._id.toString() === productId) {
          return reject(new EvalError(`The product is already in the cart!`))
        }
      }

      cart.products.push(productId)
      await cart.save()
      resolve('Product added to cart.')
    } catch (error) {
      reject(error)
    }
  })
}
