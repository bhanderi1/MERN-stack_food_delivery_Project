import { createContext, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        try {
            await axios.post('http://localhost:4000/api/cart/add-cart', {
                food: itemId,
                quantity: cartItems[itemId] ? cartItems[itemId] + 1 : 1
            });
            // Ensure cartItems is updated correctly
            setCartItems((prevItems) => ({
                ...prevItems,
                [itemId]: (prevItems[itemId] || 0) + 1 
            }));
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Context - StoreContext.js
    const removeFromCart = async (itemId) => {
        try {
            await axios.post('http://localhost:4000/api/cart/remove-cart', { food: itemId });

            // Update cartItems state locally
            setCartItems((prevItems) => {
                const updatedItems = { ...prevItems };
                delete updatedItems[itemId];
                return updatedItems;
            });
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };


    const contextValue = {
        cartItems, setCartItems, addToCart, removeFromCart,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
