import { createContext, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (foodId, quantity = 1) => {
        try {
            const response = await axios.post('http://localhost:4000/api/cart/add-cart', { food: foodId, quantity });
            const updatedCartItem = response.data.cart;

            // Check if item is already in the cart
            setCartItems(prevItems => {
                const itemIndex = prevItems.findIndex(item => item.food._id === foodId);
                if (itemIndex > -1) {
                    // Update quantity if item exists
                    const updatedItems = [...prevItems];
                    updatedItems[itemIndex].quantity = updatedCartItem.quantity;
                    return updatedItems;
                } else {
                    // Add new item if it does not exist
                    return [...prevItems, updatedCartItem];
                }
            });
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const updateCartItemQuantity = async (cartId, quantity) => {
        try {
            const response = await axios.put('http://localhost:4000/api/cart/update-cart', { cartId, quantity });
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === cartId ? { ...item, quantity: response.data.cart.quantity } : item
                )
            );
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const handleRemoveItem = async (cartId) => {
        try {
            await axios.get(`http://localhost:4000/api/cart/delete-cart?cartId=${cartId}`);
            setCartItems(prevItems => prevItems.filter(item => item._id !== cartId));
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    const incrementQuantity = (cartId, currentQuantity) => {
        updateCartItemQuantity(cartId, currentQuantity + 1);
    };

    const decrementQuantity = (cartId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateCartItemQuantity(cartId, currentQuantity - 1);
        } else {
            handleRemoveItem(cartId);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0);
    };

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        handleRemoveItem,
        updateCartItemQuantity,
        incrementQuantity,
        decrementQuantity,
        calculateSubtotal
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
