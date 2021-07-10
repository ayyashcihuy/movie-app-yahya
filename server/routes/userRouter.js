const userController = require("../controllers/userController")

const userRouter = require("express").Router()

userRouter.post("/register", userController.register)
userRouter.post("/login", userController.login)
userRouter.post("/glogin", userController.glogin)

module.exports = userRouter