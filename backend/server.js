require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const port = process.env.PORT
const cors = require('cors')
const path= require('path')
const cookie = require('cookie-parser')

app.use(cors({
    origin:[process.env.ADMIN_URL, process.env.FOOD_DEL_URL],
    credentials:true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookie())

app.use("/public/images",express.static(path.join(__dirname, "public/images")))

app.get('/', (req, res) => {
    res.send('welcome to express server')
})

app.use('/api/food', require('./routes/food.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/cart', require('./routes/cart.routes'))
app.use('/api/order', require('./routes/order.routes'))


app.listen(port, () => {
    mongoose
       .connect(process.env.MONGO_URL)
       .then(()=>{
        console.log('Database Connection established sucess...');
       })
       .catch((err) => console.log(err))
    console.log(`server start at http://localhost:${port}`);
})