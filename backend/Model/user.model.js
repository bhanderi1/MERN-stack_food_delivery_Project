const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        },
        password: {
            type: String,
            require: true
        },
        profileImage: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    }, {
    versionKey: false,
    timestamps: true
}
)

module.exports = mongoose.model('user', userSchema)