const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        match:/^[a-zA-Z0-9\s]+$/
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
        required: true  ,
        eval:['Salad', "Rolls", "Pasta","Desserts","Sandwich","Cake","Pure Veg","Noodles"]
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
