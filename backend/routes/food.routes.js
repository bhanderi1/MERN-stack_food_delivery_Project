const express = require('express');
const { addFood, foodList, foodItem, deleteFood, foodUpdate } = require('../Controller/food.controller');
const { upload } = require('../helper/uploadFoodImage');
const foodRoutes = express.Router();

foodRoutes.post('/add-food', upload.single('foodImage'), addFood);
foodRoutes.get('/food-list',  foodList);
foodRoutes.get('/food-item',  foodItem);
foodRoutes.put('/food-update',foodUpdate);
foodRoutes.delete('/food-item-delete',  deleteFood);

module.exports = foodRoutes;
