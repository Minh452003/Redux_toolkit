import express from 'express'
import { changeQuantity, clearUserCart, create, getOne, removeProduct } from '../controller/cart.js'

const routerCart = express.Router()
routerCart.get('/cart/:id', getOne)
routerCart.post('/cart/:id', create)
routerCart.delete('/cart/:id', removeProduct)
routerCart.patch('/cart/:id', changeQuantity)
routerCart.delete('/cart/clear/:id', clearUserCart);
export default routerCart
