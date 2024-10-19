const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true
    },
    description: { 
        type: String, 
        required: true  
    },
    price: { 
        type: Number, 
        required: true  
    },
    image: { 
        type: String
    },
    category: { 
        type: String, 
        required: true  
    },
    isDeleted: { 
        type: Boolean, 
        default: false  
    }
}, {
    versionKey: false, 
    timestamps: true  
});

module.exports = mongoose.model('food', foodSchema);
