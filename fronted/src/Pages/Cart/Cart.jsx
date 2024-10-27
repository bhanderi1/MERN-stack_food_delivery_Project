import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  // const { removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart/all-cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartItems();
  }, []);

  const deleteCartItem = async (cartId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/cart/delete-cart?cartId=${cartId}`);
      if (response.status === 200) {
        setCartItems(cartItems.filter(item => item._id !== cartId));
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      acc += item.price * item.quantity;
      return acc;
    }, 0);
  };

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item._id}>
              <div className='cart-items-title cart-items-item'>
                {/* Ensure you are accessing the correct path for the image */}
                <img src={`http://localhost:4000/${item.food.image}`} alt={item.food.name} />
                <p>{item.food.name}</p>
                <p>${item.price}</p>
                <p>{item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <p onClick={() => deleteCartItem(item._id)} className='cross'>x</p>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${calculateSubtotal().toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${calculateSubtotal() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(calculateSubtotal() + (calculateSubtotal() === 0 ? 0 : 2)).toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
