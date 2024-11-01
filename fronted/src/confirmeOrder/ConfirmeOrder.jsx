import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import './ConfirmeOrder.css';
import { assets } from '../assets/assets';

const ConfirmOrder = () => {
  const [data, setData] = useState([]);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/get-all-Order'); // Adjust the endpoint if needed
      setData(response.data.orders); // Ensure you're accessing the correct property
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className='container'>
        {data.map((order, index) => (
          <div className='my-orders-order' key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items.map((item, idx) => {
                // Assuming you have a function to fetch product details
                // Here you should get the product name based on productId
                // Replace `getProductNameById` with your actual implementation
                const productName = `Product with ID ${item.productId}`; // You may want to replace this with actual fetching logic
                
                return (
                  <span key={item.productId}>
                    {productName} X {item.quantity}{idx < order.items.length - 1 ? ', ' : ''}
                  </span>
                );
              })}
            </p>
            <p>Total Price: ${order.subTotal}.00</p> {/* Corrected to show total price */}
            <p>Items: {order.items.length}</p> {/* Corrected the property from `order.item` to `order.items` */}
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
