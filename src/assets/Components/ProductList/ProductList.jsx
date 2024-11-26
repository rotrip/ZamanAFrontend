import React, { useState, useEffect } from "react";
import AllProducts from "../AllProducts/Allproducts";
import axios from "axios";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
      console.log(response.data);
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return <AllProducts products={products} />;
};

export default ProductList;
