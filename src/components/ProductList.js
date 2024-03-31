import React from 'react';
import { useFilterContext } from '../context/FilterContext';
import GridView from './GridView';
import ListView from './ListView';



const ProductList = () => {
    const { filter_products, grid_view } = useFilterContext();  //you will get the data!!1
    // console.log("🚀 ~ file: ProductList.js:7 ~ ProductList ~ filter_products:", filter_products)

    if (grid_view === true){
        return <GridView products={filter_products} />;
    }

    if (grid_view === false) {
        return <ListView products={filter_products} />;
    }

    return (
        <div>ProductList</div>
    );
};

export default ProductList;