const movieRouter = require("./movieRouter")
const userRouter = require("./userRouter")
const { User } = require("../models/index")
const { authentication } = require("../middleware/authFunction")
const errorHandler = require("../middleware/errorHandler")
const router = require("express").Router()

router.use("/", userRouter)

router.use("/movies", authentication, movieRouter)

router.use(errorHandler)

module.exports = router