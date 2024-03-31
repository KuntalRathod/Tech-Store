// create a context
// provider
// consumer =>useContext Hook
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";
//children is like app component..

const AppContext = createContext();
const API = "https://api.pujakaitem.com/api/products";

const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct:{},

  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({type:"SET_LOADING"});
    try {
      const res = await axios.get(url);
      // console.log("🚀 ~ file: ProductContext.js:17 ~ getProducts ~ res:", res);  //ctrl+option+L
      const products = await res.data;
      // console.log("🚀 ~ file: ProductContext.js:19 ~ getProducts ~ products:", products)
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
        dispatch({ type: "API_ERROR" });
    }
  };
  //Api data fetch & get completed!
  //now useReducerHook ko pass krna hai & call (display) karvu.

  //My 2nd Api Call for single Product

  const getSingleProduct = async(url)=>{
    dispatch({type:"SET_SINGLE_LOADING"});
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
      
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });      
    }
  }
  
  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state,getSingleProduct }}>{children}</AppContext.Provider>
  );
};

// USE CUSTOM HOOK
const useProductContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext, useProductContext };
