const express =require('express')
const AuthController = require('./../controllers/auth.controller')
const authMiddleware =  require('./../middlewares/auth.mddleware')

const AuthRouter = express.Router()

AuthRouter.post('/register',AuthController.RegisterController)
AuthRouter.post('/login',AuthController.LoginController)
AuthRouter.get('/get-me',authMiddleware,AuthController.GetMeController)
AuthRouter.post('/logout',authMiddleware,AuthController.LogoutController)

module.exports = AuthRouter