const { User, Movie, Genre, Author, History } = require("../models/index")
const axios = require("axios")
const axiosFetchUrl = require("../helper")
const FormData = require("form-data")
const fs = require("fs")



class movieController {
    static createMovie(req, res, next) {
        const email = req.user.email
        let data;
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
        const fileType = image.mimetype.split("/")[1]
        // console.log(fileType);
        // console.log(image);
        if((fileType === "jpeg" || fileType === "jpg" || fileType === "png") && image.size < 255000 ){
            const formData = new FormData()
            const file = fs.readFileSync(image.path)
            console.log(file);
            formData.append("file", file, req.file.path)
            formData.append("fileName", "image.jpg")
            console.log(formData);
            const dataApiKey = new Buffer.from(process.env.PRIVATE_KEY).toString('base64')
            axios.post(`${process.env.UPLOAD_LINK}`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': `Basic ${dataApiKey}`
                }
            })
            .then(result => {
                newMovie.imgUrl = result.data.url
                return Movie.create(newMovie)
            })
            .then(value => {
                data = value
                return History.create({
                    MovieId: data.id,
                    title: "created",
                    description: `New Movie with id ${data.id} created`,
                    updatedBy: email
                })
            })
            .then(historyData => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
        } else {
            throw new Error ("Your file doesnt meet our recuirement!")
        }     
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
        let result;
        const email = req.user.email
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
        const fileType = image.mimetype.split("/")[1]
        // console.log(fileType);
        if((fileType === "jpeg" || fileType === "jpg" || fileType === "png") && image.size < 255000 ){
            const formData = new FormData()
            const file = fs.readFileSync(image.path)
            formData.append("file", file, req.file.path)
            formData.append("fileName", "image.jpg")
            const dataApiKey = new Buffer.from(process.env.PRIVATE_KEY).toString('base64')
            axios.post(`${process.env.UPLOAD_LINK}`, formData, {
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
                    result = data[1][0]
                    return History.create({
                        MovieId: id,
                        title: "put",
                        description: `Movie with id ${id} updated`,
                        updatedBy: email
                    })    
                } else {
                    throw new Error("Data not Found")
                }
            })
            .then(value => {
                res.status(200).json(result)    
            })
            .catch(err => {
                next(err)
            })
    } else {
        throw new Error ("Your file doesnt meet our recuirement!")
    }  
}
    
    static deleteMovie(req, res, next) {
        let id = +req.params.id
        const email = req.user.email
        let result;
        Movie.findOne({
            where: {
                id
            }
        })
        .then(value => {
            result = value
            return Movie.destroy({
                where: {
                    id
                }
            })
        })
        .then(data => {
            // console.log(data);
            if(result) {
                return History.create({
                    MovieId: id,
                    title: "deleted",
                    description: `Movie with id ${id} permanently deleted`,
                    updatedBy: email
                })
            } 
            else {
                throw new Error ("Data not Found")
            }
        })
        .then(resp => {
            res.status(200).json({deleted: result})
        })
        .catch(err => {
            next(err)
        })
    }

    static patchStatusId(req, res, next) {
        let id = +req.params.id
        const email = req.user.email
        let statusBeforeUpdate
        let data
        let statusUpdate = {
            status: req.body.status
        }
        Movie.findOne({
            where: {
                id
            }
        })
        .then(value => {
            statusBeforeUpdate = value.status
        })
        .catch(err => {
            console.log(err);
        })

        Movie.update(statusUpdate, {
            where: {
                id
            },
            returning: true
        })
        .then(result => {
            data = result[1][0]
            return History.create({
                MovieId: id,
                title: "patch",
                description: `Movie with id ${id} status has been updated from ${statusBeforeUpdate} into ${req.body.status}`,
                updatedBy: email
            })
        })
        .then(resultUpdated => {
            res.status(200).json(data) 
        })
        .catch(err => {
            next(err);
        })
    }

    static getHistories(req, res, next) {
        History.findAll()
        .then(data => {
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = movieController