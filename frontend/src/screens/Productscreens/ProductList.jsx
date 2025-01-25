import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const location = useLocation();
  const { name, price, stock, description, image } = location.state;

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown)); // Toggle the dropdown
  };

  const handleAddToCart = () => {
    alert(`${name} added to cart!`);
    // Add your "Add to Cart" logic here
  };

  return (
    <div className="productlist-page">
      {/* Filters Section */}
      <div className="product-filter">
        <h3>Filters</h3>
        <hr />

        {/* Price Filter */}
        <div className="filter-item">
          <h4
            className="filter-heading"
            onClick={() => handleDropdownClick("price")}
          >
            Price
          </h4>
          {activeDropdown === "price" && (
            <ul className="dropdown-menu">
              <li>Below ₹500</li>
              <li>₹500 - ₹1,000</li>
              <li>₹1,000 - ₹5,000</li>
              <li>₹5,000 - ₹10,000</li>
              <li>Above ₹10,000</li>
            </ul>
          )}
        </div>

        {/* Brand Filter */}
        <div className="filter-item">
          <h4
            className="filter-heading"
            onClick={() => handleDropdownClick("brand")}
          >
            Brand
          </h4>
          {activeDropdown === "brand" && (
            <ul className="dropdown-menu">
              <li>Samsung</li>
              <li>Apple</li>
              <li>OnePlus</li>
              <li>Mi</li>
              <li>Realme</li>
            </ul>
          )}
        </div>

        {/* Delivery Filter */}
        <div className="filter-item">
          <h4
            className="filter-heading"
            onClick={() => handleDropdownClick("delivery")}
          >
            Delivery
          </h4>
          {activeDropdown === "delivery" && (
            <ul className="dropdown-menu">
              <li>Fast Delivery</li>
              <li>Standard Delivery</li>
            </ul>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="productlist-container">
        <div className="productlist-image">
          <img src={`http://localhost:5000${image}`} alt={name} />
        </div>

        <div className="product-details">
          <h2 className="product-name">{name}</h2>
          <p className="product-price">
            <strong>Price:</strong> ₹{price}
          </p>
          <p className="product-description">
            <strong>Description:</strong> {description}
          </p>
          <p className="product-stock">
            <strong>Stock:</strong> {stock > 0 ? `${stock} available` : "Out of stock"}
          </p>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={stock <= 0}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
