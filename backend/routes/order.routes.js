const express = require('express')
const OrderRoutes = express.Router()
const {verifyToken} = require('../helper/verifytoken')
const { addNewOrder, deleteOrder, getOrder, getAllOrder } = require('../Controller/order.controller')

OrderRoutes.post('/add-order',verifyToken ,addNewOrder)
OrderRoutes.delete('/delete-Order',verifyToken,deleteOrder)
OrderRoutes.get('/get-order',getOrder)
OrderRoutes.get("/get-all-Order",getAllOrder)

module.exports = OrderRoutes