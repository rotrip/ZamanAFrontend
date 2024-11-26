import React, { useEffect, useState } from "react";
import productImage from "../../Images/Apple-iPhone-16-Pro-Max-Desert-Titanium-thumbnail.avif";
import "./Cart.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const fetchCartItems = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/cart?userId=${userId}`
          );
          setCartItems(response.data);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };

      fetchCartItems();
    }
  }, [userId]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:8080/cart/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      alert("Item removed from cart successfully");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  if (!userId) {
    return <p>Please log in to view your cart.</p>;
  }

  return (
    <div className="Cart">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cartItemsDispay">
            {cartItems.map((item) => (
              <div key={item.id} className="CDisplay">
                <Link to={`/products/${item.product.id}`}>
                  <img
                    className="CImage"
                    src={productImage || "default-image.jpg"}
                    alt={item.product.name}
                  />
                </Link>
                <div className="CInfo">
                  <div className="CMainInfo">
                    <h3 className="CBrand">{item.product.brand}</h3>
                    <Link
                      className="CNameLink"
                      to={`/products/${item.product.id}`}
                    >
                      <p className="CName">{item.product.name}</p>
                    </Link>
                    <p>Price: ${item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="CsecondInfo">
                    <p>Category: {item.product.category}</p>
                  </div>
                </div>
                <FontAwesomeIcon
                  onClick={() => handleRemoveItem(item.id)}
                  className="crossSymbol"
                  icon={faXmark}
                />
              </div>
            ))}
          </div>

          <div className="Cpricing">
            <div className="CpricingMain">
              <p className="PriceDetails">PRICE DETAILS</p>
              <div className="PriceDetailsSpecific">
                <p className="TotalMRP">Total MRP: </p>
                <p className="TotalMRPDollars">${calculateTotal()}</p>
              </div>
              <div className="PriceDetailsSpecific">
                <p className="Tax">Tax:</p>
                <p className="TotalTaxDollars">
                  ${(calculateTotal() * 0.1).toFixed(2)}
                </p>
              </div>
            </div>
            <hr></hr>
            <div className="PriceDetailsSpecific">
              <p className="TotalAmount">Total Amount:</p>
              <p className="TotalAmountDollars">
                ${(calculateTotal() + calculateTotal() * 0.1).toFixed(2)}
              </p>
            </div>
            <div className="Cpricingsecond">
              <input
                type="submit"
                className="placeOrder"
                value="Place Order"
              ></input>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
