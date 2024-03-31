import { createContext, useContext ,useReducer } from "react";
import { useProductContext } from "./ProductContext";
import { useEffect } from "react";
import reducer from "../reducer/FilterReducer";


const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",   //value will be add dynamicallyy in state varibale
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price:0,
    minPrice: 0,
  },
};


export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();
  // console.log("🚀 ~ file: FilterContext.js:17 ~ FilterContextProvider ~ products:", products)

  const [state, dispatch] = useReducer(reducer, initialState);

  // To set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // To set the List view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  //Sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    return dispatch({ type: "GET_SORT_VALUE" , payload: userValue });
  };
    
    //Update the filter values
    const updateFilterValue = (event) => { 
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
    };
  
  //To clear the Filters

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });

  }
  

  //To Sort the product
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS"});
  },[products,state.sorting_value,state.filters])

     
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

//USE CUSTOM HOOK

export const useFilterContext = () => {
    return useContext(FilterContext);
};

