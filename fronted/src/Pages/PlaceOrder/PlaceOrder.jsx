import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { calculateSubtotal, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zip: "", country: "", phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare order data with user input and cart details
      const orderData = {
        ...formData,
        items: cartItems.map(item => ({
          productId: item.food._id,
          quantity: item.quantity,
          price: item.food.price,
          totalPrice: item.quantity * item.food.price
        })),
        subTotal: calculateSubtotal(),
        totalAmount: calculateSubtotal() + 2, // including delivery fee
        deliveryFee: calculateSubtotal() === 0 ? 0 : 2
      };

      // Send order data to server
      const response = await axios.post('http://localhost:4000/api/order/add-order', orderData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Confirm order and navigate to confirmation page
      console.log('Order response:', response.data);
      navigate('/order-confirmation');
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  };

  return (
    <div>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
          <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
          <div className="multi-fields">
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          </div>
          <div className="multi-fields">
            <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          </div>
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${calculateSubtotal()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${calculateSubtotal() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${calculateSubtotal() === 0 ? 0 : calculateSubtotal() + 2}</b>
              </div>
            </div>
            <button type="submit">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
