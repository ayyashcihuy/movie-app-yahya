const { User, Movie, Genre, Author } = require("../models/index")
const bcrypt = require("bcryptjs")
let jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');

class userController {
    static register (req, res, next) {
        let salt = bcrypt.genSaltSync(8)
        let hashedPassword = bcrypt.hashSync(req.body.password, salt)
        let newUser = {
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
        }
        User
        .create(newUser)
        .then(result => {
            res.status(201).json({email:result.email})
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User
        .findOne({
            where: {
                email
            }
        })
        .then(data => {
            if(!data) {
                throw new Error ("User not Found")
            } else if(bcrypt.compareSync(password, data.password)) {
                let token = jwt.sign({id:data.id, email:data.email}, process.env.SECRET_KEY)
                req.headers.access_token = token
                res.status(200).json({token, data})
            } else {
                throw new Error ("Invalid Account")
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static glogin(req, res, next) {
        const { id_token } = req.body
        let payload;
        const client = new OAuth2Client(`${process.env.GOOGLE_ID}`);
        client.verifyIdToken({
            idToken: id_token,
            audience: `${process.env.GOOGLE_ID}`
        })
        // console.log(id_token);
        .then(ticket => {
            // console.log(ticket);
            payload = ticket.getPayload()
            // console.log(payload);
            return User.findOne({
                where:{
                    email: payload.email
                }
            })
        })
        .then(foundUser => {
            if(!foundUser) {
                return User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD,
                    role: "staff"
                })
            } else {
                return foundUser     
            }
        })
        .then(createdUser => {
            console.log(createdUser);
            let token = jwt.sign({id:createdUser.id, email:createdUser.email}, process.env.SECRET_KEY)
            req.headers.access_token = token
            res.status(200).json(token)
        })
        .catch(err => {
            console.log(err);
        })

    }
}

module.exports = userController