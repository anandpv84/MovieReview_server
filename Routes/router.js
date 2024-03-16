const express = require('express')
const userController = require('../Controllers/userController')
const router = new express.Router()
const jwtmiddleware = require('../Middlewares/jwtmiddleware')
const multerConfig=require('../Middlewares/multerMiddleware')


router.post('/user/register', userController.register)

router.post('/user/login', userController.login)

router.post('/user/adminlogin', userController.adminlogin)

router.post('/user/dashboard', userController.dash)

router.post('/user/movieadd', jwtmiddleware,multerConfig.single('Image') ,userController.addmovie)

router.get('/user/allmovie',userController.getallmovies)




module.exports = router