const express = require("express")
const app = express()
const cors = require('cors')
const authHandler = require('./routes/authHandler/auth')
const mongoose = require("mongoose")
require("dotenv").config()

const PORT = process.env.PORT | 5000

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/mern-stack", () => {
    console.log("Database connected")
})

// Routes
// app.route("/auth", [()=> console.log("auth"),authHandler])
app.use('/auth', authHandler)
// .get((req,res) => {
//     console.log("auth")
//     res.status(200).json({
//         'msg':'auth'
//     })
// })

app.get('/', (req,res) => {
    res.json({
        'msg':'hello'
    })
})

  //Listen on PORT 5000
app.listen(PORT, () => {
    console.log(`Server started on Port: ${PORT}!!!`);
})
