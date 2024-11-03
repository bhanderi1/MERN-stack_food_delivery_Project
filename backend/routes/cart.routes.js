const express = require('express')
const { verifyToken } = require('../helper/verifytoken')
const {  getAllCart, updateCart, deleteCart,  addOrUpdateCart } = require('../Controller/cart.controller')

const cartRoutes = express.Router()

cartRoutes.post('/add-cart', verifyToken, addOrUpdateCart)
// cartRoutes.get('/get-cart', verifyToken, getCart)
cartRoutes.get('/all-cart', verifyToken, getAllCart)
cartRoutes.put('/update-cart', verifyToken, updateCart)
cartRoutes.get('/delete-cart', verifyToken, deleteCart)

module.exports = cartRoutes;