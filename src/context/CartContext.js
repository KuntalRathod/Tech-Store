
import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/CartReducer";


const CartContext = createContext();

const getLocalCartData = () => {
  const localCartData = localStorage.getItem("thapaCart");
  
  if (!localCartData || localCartData === "[]") {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  // cart: [],
    cart:getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee:5000,
};

const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({
          type: "ADD_TO_CART",
          payload: { id, color, amount, product }
        });
    };
  
  //Increment and decrement the product
  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

   const setIncrease = (id) => {
     dispatch({ type: "SET_INCREMENT", payload: id });
   };

  
  // To Remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  //To clear the Cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  }


  //To Get the data in localStorage
  //get vs set

  useEffect(() => {
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });

    dispatch({type:"CART_ITEM_PRICE_TOTAL"})
  localStorage.setItem("thapaCart", JSON.stringify(state.cart));
}, [state.cart]);
  
  
    return (
      <CartContext.Provider
        value={{
          ...state,
          addToCart,
          removeItem,
          clearCart,
          setDecrease,
          setIncrease,
        }}
      >
        {children}
      </CartContext.Provider>
    );    
};

// custom hook for context api

const useCartContext = () => {
    return useContext(CartContext);
};


export { CartProvider, useCartContext };
