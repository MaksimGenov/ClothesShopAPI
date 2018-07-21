const Cart = require('../../models/Cart')

async function create (req, res, next) {
  const {name} = req.body
  res.json(await Cart.create({name}))
}

async function getById (req, res, next) {
  const id = req.params.id
  try {
    const cart = await Cart.findById(id).populate('products').populate('user')
    res.json(cart)
  } catch (error) {
    next(error)
  }
}

async function update (req, res, next) {
  const cartId = req.params.id
  let { products } = req.body
  products = JSON.parse(products)
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, {$set: {'products': products}}, {'new': true})
    res.json(updatedCart)
  } catch (error) {
    next(error)
  }
}

module.exports = {create, getById, update}
