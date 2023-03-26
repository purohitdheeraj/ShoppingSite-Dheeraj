import { createContext, useContext, useReducer, useEffect } from "react";
import { CartReducer } from "./cartReducer";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : []
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, dispatchToCart] = useReducer(CartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems.cart));
  }, [cartItems.cart]);

  const cartValueProvider = {
    cart: cartItems.cart,
    dispatchToCart
  };

  return (
    <CartContext.Provider value={cartValueProvider}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { useCart, CartProvider };
