import { createContext, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (foodId, quantity = 1) => {
        try {
            const existingItem = cartItems.find(item => item.food._id === foodId);
            
            if (existingItem) {
                await updateCartItemQuantity(existingItem._id, existingItem.quantity + quantity);
            } else {
                const response = await axios.post('http://localhost:4000/api/cart/add-cart', { food: foodId, quantity });
                const newCartItem = response.data.cart;
                setCartItems(prevItems => [...prevItems, newCartItem]);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    

    const updateCartItemQuantity = async (cartId, quantity) => {
        try {
            const response = await axios.put('http://localhost:4000/api/cart/update-cart', { cartId, quantity });
            setCartItems(cartItems.map(item => 
                item._id === cartId ? { ...item, quantity: response.data.cart.quantity } : item
            ));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const removeFromCart = async (cartId) => {
        try {
            await axios.post('http://localhost:4000/api/cart/remove-cart', { cartId });
            setCartItems(prevItems => prevItems.filter(item => item._id !== cartId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const incrementQuantity = (cartId, currentQuantity) => {
        updateCartItemQuantity(cartId, currentQuantity + 1);
    };

    const decrementQuantity = (cartId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateCartItemQuantity(cartId, currentQuantity - 1);
        } else {
            removeFromCart(cartId);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
      };

    const contextValue = {
        cartItems, setCartItems, addToCart, removeFromCart, updateCartItemQuantity, incrementQuantity, decrementQuantity, calculateSubtotal
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
