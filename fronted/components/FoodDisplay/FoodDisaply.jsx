import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../src/context/StoreContext';
import { assets } from '../../src/assets/assets';
import axios from 'axios';

const FoodDisplay = ({ category }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [list, setList] = useState([]);

  axios.defaults.withCredentials = true
  useEffect(() => {
    // Fetch food list data
    axios
      .get('http://localhost:4000/api/food/food-list')
      .then(response => setList(response.data.food))
      .catch(err => console.error('Error fetching food data:', err));
  }, []);

  const addToCartHandler = async (itemId) => {
    try {
      const response = await axios.post('http://localhost:4000/api/cart/add-cart', {
        food: itemId,
        quantity: 1 
      });
      console.log('Added to cart:', response.data);
      
      // Update local cart state
      addToCart(itemId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const incrementQuantity = async (itemId) => {
    try {
      const response = await axios.post('http://localhost:4000/api/cart/update-cart', {
        food: itemId,
        quantity: 1 // Increment by 1
      });
      console.log('Quantity updated:', response.data);

      addToCart(itemId);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {list
          .filter(item => category === 'All' || category === item.category)
          .map((item) => (
            <div className='food-item' key={item._id}>
              <div className='food-item-img-container'>
                <img className="food-item-image" src={`http://localhost:4000/${item.image}`} alt={item.name} />
                
                {!cartItems[item._id] ? (
                  <img
                    className="add"
                    onClick={() => addToCartHandler(item._id)}
                    src={assets.add_icon_white}
                    alt='Add to Cart'
                  />
                ) : (
                  <div className='food-item-counter'>
                    <img
                      src={assets.remove_icon_red}
                      onClick={() => removeFromCart(item._id)}
                      alt='Remove from Cart'
                    />
                    <p>{cartItems[item._id]}</p>
                    <img
                      src={assets.add_icon_green}
                      onClick={() => incrementQuantity(item._id)}
                      alt='Add More'
                    />
                  </div>
                )}
              </div>
              <div className='food-item-info'>
                <div className='food-item-name-rating'>
                  <p>{item.name}</p>
                  <img src={assets.rating_starts} alt='Rating' />
                </div>
                <p className='food-item-desc'>{item.description}</p>
                <p className='food-item-price'>${item.price}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;