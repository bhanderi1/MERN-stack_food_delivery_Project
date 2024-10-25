const Cart = require('../Model/cart.model')
const Food = require('../Model/food.model')

exports.addCart = async (req, res) => {
    try {
        const { food, quantity } = req.body;
        const userId = req.user._id;
        let foods = await Food.findById(food);
        if (!foods) {
            return res.json({ message: "Product not found..." })
        }
        let cart = await Cart.findOne({
            food: food,
            user: userId,
        });

        if (cart) {
            return res.json({ message: "Cart Already Exist..." })
        }

        cart = await Cart.create({
            food: food, user: userId, quantity: quantity, price:foods.price
        })
        res.json({message:'Cart Added...',cart})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal ser" })
    }
}

exports.getCart = async(req,res)=>{
    try{
        let cart = await Cart.findById({_id:req.query.cartId, isDelete:false})
        .populate("food", "name , description , price")
        .exec();
        if(!cart){
            return res.json({message:"Cart Not found..."})
        }
        res.json()

    }catch(err){
        res.status(400).json({message:"Internal Server Error"})
    }
}

exports.getAllCart = async(req,res)=>{
    try{
        const cart = await Cart.find({isDelete:false})
        .populate("food", "name , description , price")
        .exec();
        res.json(cart)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"})
    }
}

exports.updateCart = async(req,res)=>{
    try{
        let cart = await Cart.findOne({_id:req.query.cartId, isDelete:false})

        if(!cart){
            return res.status(404).json({message:"Cart Not found..."})
        }

        let additionalQuantity =req.body.quantity || 1;
        let newQuantity = cart.quantity + additionalQuantity;

        cart = await Cart.findByIdAndUpdate(cart._id,{$set:{quantity:newQuantity}} ,{new:true})

        res.status(202).json({cart , message:"Internal server error"})

    } 
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"})
    }
}

exports.deleteCart = async(req,res)=>{
    try{
     let cart = await Cart.findOne({_id:req.query.cartId , isDelete:false})
     if(!cart){
        return res.status(404).json({message:"Cart not found..."})
     }
     cart = await Cart.findByIdAndUpdate(cart._id,{isDelete:true},{new:true})
     res.status(200).json({message:"Cart Delete..."})
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Internal server error"})
  }
}