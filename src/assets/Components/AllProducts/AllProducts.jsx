import "./AllProducts.css";
import React from "react";
import productImage from "../../Images/Apple-iPhone-16-Pro-Max-Desert-Titanium-thumbnail.avif";
import { Link } from "react-router-dom";

const AllProducts = ({ products }) => {
  return (
    <div className="productList">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className="productDisplay"
        >
          <img className="ProductImage" src={productImage} alt={product.name} />
          <div className="productDetails">
            <h3 className="productBrand">{product.brand}</h3>
            <p className="productName">{product.name}</p>
            <p>Price: ${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AllProducts;
