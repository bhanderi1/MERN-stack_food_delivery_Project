import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../../fronted/src/assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/get-all-Order');
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div className="order-details">
              <p className="order-food">
                {order.items.map((item, itemIndex) => (
                  <span key={item._id}>
                    {item.productId.name} X {item.quantity}
                    {itemIndex < order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p><br/>
              <div className="order-user-name">
                {order.user && order.user.firstName && order.user.lastName
                  ? `${order.user.firstName} ${order.user.lastName}`
                  : "Unknown User"}
              </div>
              <div className="order-address">
                <p>{order.deliveryAddress.street},</p>
                <p>
                  {order.deliveryAddress.city}, 
                  {order.deliveryAddress.state},
                  {order.deliveryAddress.country} - {order.deliveryAddress.zip}
                </p>
              </div>
              <p className="order-phone">{order.deliveryAddress.phone}</p>
            </div>
            <p>Total Items: {order.items.length}</p>
            <p className="order-amount">${order.subTotal}</p>
            <select defaultValue={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
