const Order = require('../Model/order.model')
const Cart = require('../Model/cart.model')
// import stripe from "stripe"

exports.addNewOrder = async (req, res) => {
  try {
    const { items, subTotal, ...deliveryAddress } = req.body;

    const existingOrder = await Order.findOne({
      user: req.user._id,
      items: { $eq: items },
      deliveryAddress: { $eq: deliveryAddress },
      isDeleted: false
    });

    if (existingOrder) {
      return res.status(409).json({ message: "Order with the same items and delivery address already exists." });
    }

    const order = await Order.create({
      user: req.user._id,
      items: items,
      subTotal: subTotal,
      deliveryAddress
    });

    await Cart.updateMany({ user: req.user._id, isDeleted: false }, { isDeleted: true });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Failed to place order." });
  }
};



exports.deleteOrder = async (req, res) => {
  try {
    let orderId = req.body._id
    if (!orderId) {
      return res.status(404).json({ message: "Order not found..." })
    }
    res.status(200).json({ message: "Order Delete..." })
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById({ _id: req.query.orderId, isDelete: false })
    if (!order) {
      return res.status(404).json({ message: "Order Not Found..." })
    }
    res.status(200).json({ ordre: order })
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: 'items.productId', select: 'name description price image' })
      .populate('user', 'firstName lastName');

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};