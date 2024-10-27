const express = require('express')
const { verifyToken } = require('../helper/verifytoken')
const { addCart, getAllCart, updateCart, deleteCart, getCart } = require('../Controller/cart.controller')

const cartRoutes = express.Router()

cartRoutes.post('/add-cart', verifyToken, addCart)
cartRoutes.get('/get-cart', verifyToken, getCart)
cartRoutes.get('/all-cart', verifyToken, getAllCart)
cartRoutes.put('/update-cart', verifyToken, updateCart)
cartRoutes.get('/delete-cart', verifyToken, deleteCart)

module.exports = cartRoutes;