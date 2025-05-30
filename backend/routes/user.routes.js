const express = require('express')
const userRoutes = express.Router()
const {verifyToken} = require('../helper/verifytoken')
const {upload2} = require('../helper/uploadImage')
const { signup, signIn, userProfile, updateUser,deleteUser, logout } = require('../Controller/user.controller')

userRoutes.post('/signUp', upload2.single('profilImage'),signup)
userRoutes.post('/signIn', signIn)
userRoutes.get('/user-profile',verifyToken, userProfile)
userRoutes.put('/update-profile',verifyToken, updateUser)
userRoutes.delete('/delete-user',verifyToken, deleteUser)
userRoutes.delete('/logout',verifyToken, logout )


module.exports = userRoutes