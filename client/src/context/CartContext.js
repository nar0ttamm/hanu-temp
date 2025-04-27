import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Get cart from localStorage
const getInitialCart = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const { id, size, color, customization } = action.payload;
      
      // Create a unique key for this product variation
      const itemKey = `${id}-${size || 'none'}-${color || 'none'}`;
      
      // Check if this exact item (including variation) already exists
      const existingItemIndex = state.findIndex(item => 
        item.id === id && 
        item.size === size && 
        item.color === color &&
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        newState = state.map((item, index) => 
          index === existingItemIndex
            ? { 
                ...item, 
                quantity: item.quantity + (action.payload.quantity || 1) 
              }
            : item
        );
      } else {
        // Add new item
        newState = [
          ...state,
          { 
            ...action.payload, 
            quantity: action.payload.quantity || 1,
            size,
            color,
            customization,
            itemKey
          }
        ];
      }
      break;
    }

    case 'REMOVE_FROM_CART':
      newState = state.filter(item => item.itemKey !== action.payload);
      break;

    case 'UPDATE_QUANTITY':
      newState = state.map(item =>
        item.itemKey === action.payload.itemKey
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      break;

    case 'CLEAR_CART':
      newState = [];
      break;

    default:
      return state;
  }

  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(newState));
  return newState;
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  const tax = subtotal * 0.10; // Assuming 10% tax
  const shipping = subtotal > 0 ? 10 : 0; // Flat shipping rate of $10
  const total = subtotal + tax + shipping;
  
  // Number of unique items in cart
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Convenience methods
  const addToCart = (product, quantity = 1, size = null, color = null, customization = null) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity, size, color, customization }
    });
  };

  const removeFromCart = (itemKey) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: itemKey
    });
  };

  const updateQuantity = (itemKey, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { itemKey, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cart,
    dispatch,
    subtotal,
    tax,
    shipping,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
