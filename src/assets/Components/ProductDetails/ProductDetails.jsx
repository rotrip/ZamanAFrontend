import React, { useEffect, useState } from "react";
import productImage from "../../Images/Apple-iPhone-16-Pro-Max-Desert-Titanium-thumbnail.avif";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const cartRequest = {
        user: { id: parseInt(userId, 10) }, // Wrap userId inside a user object
        product: { id: product.id }, // Wrap productId inside a product object
        quantity: 1, // Keep quantity as is
      };

      const response = await axios.post(
        "http://localhost:8080/cart/add",
        cartRequest
      );
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);
  if (!product) return <p>Loading...</p>;

  return (
    <div className="productDetails">
      <div className="PDisplay">
        <img className="PImage" src={productImage} alt="Iphone 16 Pro Max" />
        <div className="PInfo">
          <h3 className="PBrand">{product.brand}</h3>
          <p className="PName">{product.name}</p>
          <p>Price: ${product.price}</p>

          <div className="secondInfo">
            <p>Category: {product.category}</p>
            <p>Available: {product.quantity}</p>
            <p>{product.description}</p>
            <button className="addToCart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buynow">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
