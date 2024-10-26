import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    // useEffect(() => {
    //     // Fetch cart items from database when component mounts
    //     axios.get('http://localhost:4000/api/cart/get-cart')
    //         .then(response => setCartItems(response.data.cartItems))
    //         .catch(error => console.error('Error fetching cart data:', error));
    // }, []);

    const addToCart = async (itemId) => {
        try {
            const response = await axios.post('http://localhost:4000/api/cart/add-cart', {
                food: itemId,
                quantity: cartItems[itemId] ? cartItems[itemId] + 1 : 1
            });
            setCartItems(response.data.cartItems); 
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const response = await axios.post('http://localhost:4000/api/cart/remove-cart', { food: itemId });
            setCartItems(response.data.cartItems);
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const getTotalCartAmount = () => {
        return Object.values(cartItems).reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const contextValue = {
        cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
