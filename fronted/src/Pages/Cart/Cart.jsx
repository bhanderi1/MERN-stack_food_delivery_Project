import React, { useContext, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, handleRemoveItem, calculateSubtotal } = useContext(StoreContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart/all-cart');
        if (response.data) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <>
    <div className="cart">
    <h1>Carts</h1>
      <div className="cart-item">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id} className="cart-items-title cart-items-item">
              <img src={`http://localhost:4000/${item.food.image}`} alt={item.food.name} />
              <p>{item.food.name}</p>
              <p>${item.food.price}</p>
              <p>{item.quantity}</p>
              <p>${(item.food.price * item.quantity).toFixed(2)}</p>
              <p onClick={() => handleRemoveItem(item._id)} className="cross">x</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Totals</h1>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${calculateSubtotal().toFixed(2)}</p>
          </div>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${calculateSubtotal() === 0 ? 0 : 2}</p>
          </div>
          <div className="cart-total-details">
            <b>Total</b>
            <b>${(calculateSubtotal() + (calculateSubtotal() === 0 ? 0 : 2)).toFixed(2)}</b>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <input type="text" placeholder="Promo code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Cart;
