const Cart = require('../Model/cart.model')
const Food = require('../Model/food.model')

exports.addCart = async (req, res) => {
    try {
        const { food, quantity } = req.body;
        const userId = req.user._id;

        const foodItem = await Food.findById(food);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        let cart = await Cart.findOne({ user: userId, food });

        if (cart) {
            cart.quantity += quantity;
            await cart.save();
            return res.json({ message: "Cart quantity updated", cart });
        } else {
            cart = await Cart.create({
                food,
                user: userId,
                quantity,
                price: foodItem.price
            });
            return res.json({ message: "Food item added to cart", cart });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { cartId, quantity } = req.body;

        let cart = await Cart.findById({ _id: cartId, isDelete: false });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found..." });
        }

        cart.quantity = quantity > 0 ? quantity : 0; 
        await cart.save();

        res.status(202).json({ cart, message: "Cart item updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

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
        .populate("food");
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
        console.log(cart);
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