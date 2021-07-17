const movieController = require("../controllers/movieController")
const { Movie } = require("../models")
const movieRouter = require("express").Router()
const { authorization, authorizationAdmin } = require("../middleware/authFunction")
const multer = require("multer")
const storage = multer.memoryStorage()
// const upload = multer({storage:storage}) 
const upload = multer ({dest:"uploads/"}) 

// definisi destinasi tidak perlu. karena sudah menggunakan imageKit.. tapi bisa menggunakan memory storage. --> dokumentasi multer. 


// Middleware --> Multer 
// imageValidation, uploadImage
movieRouter.post("/",upload.single("image"), movieController.createMovie)
movieRouter.get("/history", movieController.getHistories)
movieRouter.get("/", movieController.getMovies)
movieRouter.get("/:id", movieController.getSpecificMovie)
movieRouter.put("/:id",upload.single("image"), authorization, movieController.updateMovie)
movieRouter.delete("/:id", authorization, movieController.deleteMovie)
movieRouter.patch("/:id", authorizationAdmin, movieController.patchStatusId)

module.exports = movieRouter