const { User, Movie, Genre, Author } = require("../models/index")
const axios = require("axios")
const axiosFetchUrl = require("../helper")
const FormData = require("form-data")
const fs = require("fs")



class movieController {
    static createMovie(req, res, next) {
        let newMovie = {
            title: req.body.title,
            synopsis: req.body.synopsis,
            trailerUrl: req.body.trailerUrl,
            rating: req.body.rating,
            UserId: req.user.id,
            GenreId: req.body.GenreId,
            AuthorId: req.body.AuthorId
        }
        // console.log(newMovie);
        const image = req.file
        // console.log(image);
        const formData = new FormData()
        const file = fs.readFileSync(image.path)
        formData.append("file", file, req.file.path)
        formData.append("fileName", "image.jpg")
        const dataApiKey = new Buffer.from(process.env.PRIVATE_KEY).toString('base64')
        axios.post("https://upload.imagekit.io/api/v1/files/upload", formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Basic ${dataApiKey}`
            }
        })
        .then(result => {
            newMovie.imgUrl = result.data.url
            // console.log(result, "XXXXX");
            // console.log(newMovie);
            return Movie.create(newMovie)
        })
        .then(data => {
            // console.log(data);
            res.status(201).json(data)
        })
        .catch(err => {
            // console.log(process.env.PRIVATE_KEY)
            // console.log(err);
            next(err)
        })        
    }

    static getMovies(req, res, next) {
        Movie.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getSpecificMovie(req, res, next) {
        let id = +req.params.id
        Movie.findOne({
            where: {
                id
            }
        })
        .then(data => {
            if(data) {
                res.status(200).json(data)
            }
            else {
                throw new Error ("Data not Found")
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateMovie(req, res, next) {
        let id = +req.params.id
        let updatedMovie = {
            title: req.body.title,
            synopsis: req.body.synopsis,
            trailerUrl: req.body.trailerUrl,
            rating: req.body.rating,
            UserId: req.body.UserId,
            GenreId: req.body.GenreId,
            AuthorId: req.body.AuthorId
        }

        const image = req.file
        // console.log(image);
        const formData = new FormData()
        const file = fs.readFileSync(image.path)
        formData.append("file", file, req.file.path)
        formData.append("fileName", "image.jpg")
        const dataApiKey = new Buffer.from(process.env.PRIVATE_KEY).toString('base64')
        axios.post("https://upload.imagekit.io/api/v1/files/upload", formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Basic ${dataApiKey}`
            }
        })
        .then(({data}) => {
            req.body.imgUrl = data.url
            updatedMovie.imgUrl = data.url
            // console.log(updatedMovie);
            return Movie.update(updatedMovie, {
                where: {
                    id
                },
                returning: true
            })
        })
        .then(data => {
            if(data) {
                data = data[1][0]
                res.status(200).json(data)    
            } else {
                throw new Error("Data not Found")
            }
        })
        .catch(err => {
            next(err)
        })
    }
    
    static deleteMovie(req, res, next) {
        let id = +req.params.id
        Movie.findOne({
            where: {
                id
            }
        })
        .then(result => {
            return Movie.destroy({
                where: {
                    id
                }
            })
            .then(data => {
                console.log(data);
                if(result) {
                    res.status(200).json({deleted: result})
                } else {
                    throw new Error ("Data not Found")
                }
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = movieController