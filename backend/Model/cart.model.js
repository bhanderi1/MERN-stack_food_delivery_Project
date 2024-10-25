const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    food:{
        type:mongoose.Schema.ObjectId,
        ref:'food'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    quantity:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
    },
    isDelete:{
        type:Boolean,
        default:false
    },
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('cart', cartSchema)