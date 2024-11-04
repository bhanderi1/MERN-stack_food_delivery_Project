import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ConfirmeOrder.css';
import { assets } from '../assets/assets';

const ConfirmOrder = () => {
  const [data, setData] = useState([]);

<<<<<<< HEAD
=======
  // Function to fetch orders
>>>>>>> 3c841a4e8da9f807cdd15bfbab9a601cfd8ff124
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/get-all-Order');
      setData(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div className="my-orders-order" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items.map((item) => (
                <span key={item.productId._id}>
                  {item.productId.name} X {item.quantity}
                  {order.items.indexOf(item) < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p>Total Price: ${order.subTotal}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button>Track Order</button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ConfirmOrder;
