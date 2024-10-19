require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const port = process.env.PORT
const cors = require('cors')
const path= require('path')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/public/images",express.static(path.join(__dirname, "public/images")))

app.get('/', (req, res) => {
    res.send('welcome to express server')
})

app.use('/api/food', require('./routes/food.routes'))
app.use('/api/user', require('./routes/user.routes'))

app.listen(port, () => {
    mongoose
       .connect(process.env.MONGO_URL)
       .then(()=>{
        console.log('Database Connection established sucess...');
       })
       .catch((err) => console.log(err))
    console.log(`server start at http://localhost:${port}`);
})