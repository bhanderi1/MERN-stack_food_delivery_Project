const Order = require('../Model/order.model')
const Cart = require('../Model/cart.model')


exports.addNewOrder = async (req, res) => {
    try {
        const { city, district, village, road, homeNumber } = req.body

        let carts = await Cart.find({
            user: req.user._id,
            isDelete: false
        }).populate({ path: "food" })

        if (carts.length === 0) {
            return res.json({ message: "Cart not found..." })
        }

        let orderItems = carts.map((item) => ({
            foodId: item.food._id,
            quantity: item.quantity,
            price: item.food.price,
            totalPrice: item.quantity * item.food.price
        }))
        console.log(orderItems);

        let amount = orderItems.reduce((total, item) => total += item.totalPrice, 0)
        console.log(amount);

        let order = await Order.create({
            usre: req.user._id,
            items: orderItems,
            subTotal: amount,
            deliveryAddress: {
                city: city,
                district: district,
                village: village,
                road: road,
                homeNumber: homeNumber
            }
        })

        await Cart.updateMany({ usre: req.user._id, isDelete: false }, { isDelete: true })
        res.json({ message: "Order Place...", order })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteOrder = async(req,res)=>{
    try{
             let orderId =req.body._id
             if(!orderId){
                return res.status(404).json({message:"Order not found..."})
             }
             res.status(200).json({message:"Order Delete..."})
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


exports.getOrder = async (req,res) => {
    try{
         const order = await Order.findById({_id:req.query.orderId, isDelete:false})
         if(!order){
            return res.status(404).json({message:"Order Not Found..."})
         }
         res.status(200).json({ordre:order})
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllOrder = async(req,res)=>{
    try{
         const orders = await Order.find().populate('user')
         res.status(200).json({orders:orders})
    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}