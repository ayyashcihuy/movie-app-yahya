const jwt = require("jsonwebtoken")
const { User, Movie } = require("../models/index")

function authentication (req, res, next) {
    const { access_token } = req.headers
    if(access_token) {
        const user = jwt.verify(access_token, process.env.SECRET_KEY)
        // console.log(user);
        User.findByPk(user.id)
        .then(data => {
            if(data) {
                // console.log(data);
                req.user = {id: data.id, role: data.role}
                next()
            } else {
                throw new Error ("Authentication Error in Data")
            }
        })
        .catch(err => {
            next(err)
        })
    } else {
        throw new Error ("Authentication Error in Access Token")
    }
}

function authorization (req, res, next) {
    const id = +req.params.id
    const userId = req.user.id
    const role = req.user.role
    console.log(req.user, "<<<<<");
    if(role === "admin") {
        next()
    }
    else {
        Movie.findByPk(id)
        .then(result => {
            if(result) {
                if(result.UserId === userId) {
                    next()
                } else {
                    throw new Error ("Authorization Error in Access")
                }    
            } else {
                throw new Error ("Authorization Error in Data")
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = { authentication, authorization }