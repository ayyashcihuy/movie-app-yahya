
require('dotenv').config()
const express = require("express")
const router = require('./routes')
const movieRouter = require("./routes/movieRouter")
const userRouter = require("./routes/userRouter")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', router)

//disini akan ada midleware

app.use('/movies', movieRouter)

app.listen(port, () => {
    console.log(`listen on http://localhost:${port}`);
})