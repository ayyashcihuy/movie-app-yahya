const movieRouter = require("./movieRouter")
const userRouter = require("./userRouter")
const jwt = require("jsonwebtoken")
const { User } = require("../models/index")
const { authentication } = require("../middleware")
const errorHandler = require("../middleware/errorHandler")
const router = require("express").Router()
const cors = require("cors")

router.use("/", userRouter)

router.use("/movies", authentication, movieRouter)

router.use(errorHandler)

module.exports = router