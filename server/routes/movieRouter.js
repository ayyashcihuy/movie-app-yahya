const movieController = require("../controllers/movieController")
const { Movie } = require("../models")
const movieRouter = require("express").Router()
const { authorization } = require("../middleware")
const multer = require("multer")
const upload = multer({dest:"uploads/"})


//imageValidation, uploadImage
movieRouter.post("/",upload.single("image"), movieController.createMovie)
movieRouter.get("/", movieController.getMovies)
movieRouter.get("/:id", movieController.getSpecificMovie)
movieRouter.put("/:id",upload.single("image"), authorization, movieController.updateMovie)
movieRouter.delete("/:id", authorization, movieController.deleteMovie)

module.exports = movieRouter