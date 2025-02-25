
const filterReducer = (state , action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      console.log(
        "🚀 ~ file: FilterReducer.js:7 ~ filterReducer ~ priceArr:",
        priceArr
      );

      // console.log(Math.max(222,33,44,5,1)) --> you need to add .apply then fine...

      //1st Way
      // console.log(Math.max.apply(null , priceArr))

      //2nd Way ---> most use method
      // let maxPrice = priceArr.reduce((initialval, curVal) => Math.max(initialval, curVal),0);
      // console.log("🚀 ~ file: FilterReducer.js:15 ~ filterReducer ~ maxPrice:", maxPrice)

      // 3rd Wayy
      let maxPrice = Math.max(...priceArr);
      console.log(
        "🚀 ~ file: FilterReducer.js:20 ~ filterReducer ~ maxPrice:",
        maxPrice
      );

      return {
        ...state,
        filter_products: [...action.payload], //as a refreance (copy version)
        all_products: [...action.payload], //as a refreance (copy version)->//means isme data add kiya hai
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };
    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      // console.log(sort_value);

      return {
        ...state,

        sorting_value: action.payload,  

      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }
        if (sorting_value === "highest") {

          return b.price - a.price;
        }
        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }
        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };
      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;
      
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }
      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category.toLowerCase();
        });
      }
      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company.toLowerCase() === company.toLowerCase();
        });
      }
      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(color);
        });
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price === price;
        });
      } else {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price <= price;
        });
      }
      return {
        ...state,
        filter_products: tempFilterProduct,
      };
    
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: state.filters.maxPrice,
          price: state.filters.maxPrice,
          minPrice: state.filters.minPrice,
        },
      };

    default:
      return state;
  };   
};

export default filterReducer;
