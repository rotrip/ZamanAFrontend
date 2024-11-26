import { useState } from "react";
import "./AddProduct.css";
import axios, { Axios } from "axios";
const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    brand: "",
    availability: "",
    category: "",
    quantity: "",
    name: "",
    price: "",
    description: "",
    imageUrl: "test",
  });

  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/products/addproduct",
        productDetails
      );
      console.log(response);
      alert("product added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="addProductTitle">Add Product</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="gridFields">
          <div className="grid1">
            <label className="availabilityLabel">Availability:</label>
            <select
              name="availability"
              value={productDetails.availability}
              className="availabilitySelect"
              onChange={handleChange}
              required
            >
              <option value="">-----Select-----</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="grid2">
            <label className="brandLabel">Brand:</label>
            <input
              type="text"
              className="brandInput"
              name="brand"
              value={productDetails.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid3">
            <label className="categoryLabel">Category:</label>
            <select
              name="category"
              value={productDetails.category}
              className="categorySelect"
              onChange={handleChange}
              required
            >
              <option value="">-----Select-----</option>
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
              <option value="Camera">Camera</option>
              <option value="Wearable">Wearable</option>
            </select>
          </div>
          <div className="grid4">
            <label className="nameLabel">Name:</label>
            <input
              type="text"
              className="nameInput"
              name="name"
              value={productDetails.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid5">
            <label className="priceLabel">Price:</label>
            <input
              type="number"
              className="priceInput"
              name="price"
              value={productDetails.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid6">
            <label className="quantityLabel">Quantity:</label>
            <input
              type="number"
              className="quantityInput"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="description">
          <label className="descriptionLabel">Description:</label>
          <input
            type="textarea"
            className="descriptionInput"
            onChange={handleChange}
            name="description"
            value={productDetails.description}
            required
          ></input>
        </div>
        <div className="submitDivAddProduct">
          <input className="submitAddProduct" type="submit"></input>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
