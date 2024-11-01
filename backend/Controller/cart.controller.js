const Cart = require('../Model/cart.model');
const Food = require('../Model/food.model');

exports.addOrUpdateCart = async (req, res) => {
    try {
        const { food, quantity } = req.body;
        const userId = req.user._id;

        const foodItem = await Food.findById(food );
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }

        // Find if the item already exists in the user's cart
        let cart = await Cart.findOne({ user: userId, food, isDelete: false });

        if (cart) {
            // Update quantity if item already exists
            cart.quantity += quantity;
            await cart.save();
            return res.json({ message: "Cart quantity updated", cart });
        } else {
            // Add new item to cart if it does not exist
            cart = await Cart.create({
                food,
                user: userId,
                quantity,
                price: foodItem.price,
                isDelete: false,
            });
            return res.json({ message: "Food item added to cart", cart });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllCart = async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user._id, isDelete: false })
            .populate("food", "name description price image");
        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { cartId, quantity } = req.body;

        let cart = await Cart.findById(cartId);
        if (!cart || cart.isDelete) {
            return res.status(404).json({ message: "Cart not found..." });
        }

        cart.quantity = quantity > 0 ? quantity : 0;
        await cart.save();

        res.status(202).json({ cart, message: "Cart item updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id: req.query.cartId, isDelete: false });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found..." });
        }
        cart.isDelete = true;
        await cart.save();

        res.status(200).json({ message: "Cart item deleted..." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
