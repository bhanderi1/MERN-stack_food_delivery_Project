import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../src/context/StoreContext';
import { assets } from '../../src/assets/assets';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const FoodDisplay = ({ category }) => {
  const {
    cartItems,
    setCartItems, // Add this function in your context to update cart
    addToCart,
    incrementQuantity,
    decrementQuantity,
  } = useContext(StoreContext);
  const [list, setList] = useState([]);

  // Fetch food items
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/food/food-list');
        setList(response.data.food);
      } catch (err) {
        console.error('Error fetching food data:', err);
      }
    };

    fetchFoodData();
  }, []);

  // Fetch cart items on mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart'); // Adjust API endpoint
        setCartItems(response.data.cart); // Update context with cart data
      } catch (err) {
        console.error('Error fetching cart data:', err);
      }
    };

    fetchCartData();
  }, [setCartItems]);

  const addToCartHandler = async (foodId) => {
    try {
      const existingItem = getCartItem(foodId);
      if (existingItem) {
        incrementQuantity(existingItem._id, existingItem.quantity);
      } else {
        await addToCart(foodId, 1);
        toast.success('Successfully Added food Item To Cart', {
          position: 'bottom-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const getCartItem = (foodId) => cartItems.find((item) => item.food._id === foodId);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {list
          .filter((item) => category === 'All' || category === item.category)
          .map((item) => {
            const cartItem = getCartItem(item._id);
            return (
              <div className="food-item" key={item._id}>
                <div className="food-item-img-container">
                  <img
                    className="food-item-image"
                    src={`http://localhost:4000/${item.image}`}
                    alt={item.name}
                  />
                  {!cartItem ? (
                    <img
                      className="add"
                      onClick={() => addToCartHandler(item._id)}
                      src={assets.add_icon_white}
                      alt="Add to Cart"
                    />
                  ) : (
                    <div className="food-item-counter">
                      <img
                        src={assets.remove_icon_red}
                        onClick={() => decrementQuantity(cartItem._id, cartItem.quantity)}
                        alt="Decrement Quantity"
                      />
                      <p>{cartItem.quantity}</p>
                      <img
                        src={assets.add_icon_green}
                        onClick={() => incrementQuantity(cartItem._id, cartItem.quantity)}
                        alt="Increment Quantity"
                      />
                    </div>
                  )}
                </div>
                <div className="food-item-info">
                  <div className="food-item-name-rating">
                    <p>{item.name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                  </div>
                  <p className="food-item-desc">{item.description}</p>
                  <p className="food-item-price">${item.price}</p>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodDisplay;
