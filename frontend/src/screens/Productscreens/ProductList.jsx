import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userId,
    name,
    price,
    brand,
    stock,
    description,
    image,
    rating,
    category,
    deliverytime,
  } = location.state || {}; 
  console.log(userId);

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown)); // Toggle the dropdown
  };

const handleAddToCart = async () => {
  if (!userId) {
    alert("Please log in to Add products to Cart.");
    return;
  }

  const productDetails = {
    userId,
    name,
    price,
    brand,
    stock,
    description,
    image,
    category,
    deliverytime,
    rating,
  };

  try {
    const response = await axios.post("http://localhost:5000/api/cart", productDetails);
    if (response.data.success) {
      alert(`${name} added to cart successfully!`);
    } else {
      alert(response.data.message || "Failed to add product to cart.");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Something went wrong. Please try again.");
  }
};

const handleCartPage = () => {
  navigate("/cart", { state: { userId } });
}


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="hm-navbar">
        <div className="nav-logo">
          <h2 onClick={() => navigate("/home")}>SHOPIQUE</h2>
        </div>
        <div className="nav-search-bar">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search for products"
          />
          <button>
            <i className="fas fa-search"></i> Search
          </button>
        </div>
        <div className="nav-actions">
          <button id="cart" onClick={handleCartPage}>
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
          <button id="login">
            <i className="fas fa-user"></i> Login
          </button>
        </div>
      </nav>

      {/* Product Page */}
      <div className="productlist-page">
        {/* Product Details Section */}
        <div className="productlist-container">
          {/* Product Image */}

          <div className="prod-img-btn-cont">
            <div className="productlist-image">
              {image ? (
                <img src={`http://localhost:5000${image}`} alt={name} />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="prod-img-btn">
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={stock <= 0}
              >
                <i className="fas fa-shopping-cart"></i>
                {stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={stock <= 0}
              >
                {stock > 0 ? "Buy now" : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="prodlist-rat">
            <div className="product-details">
              <h2 className="product-name">{name || "Product Name"}</h2>
              <p className="product-description">
                {description || "No description available"}
              </p>
              <p className="prodlist-price">
                <strong>Price:</strong> ₹ {price || "N/A"}
              </p>
              <p className="product-brand">
                <strong>Brand:</strong> {brand || "N/A"}
              </p>
              <p className="product-stock">
                <strong>Stock:</strong>{" "}
                {stock > 0 ? `${stock} available` : "Out of stock"}
              </p>
              <p className="product-delivery-time">
                <strong>Delivery Type:</strong> {deliverytime || "N/A"}
              </p>
              <div className="delivery-checker">
                <p className="delivery-checker-title">
                  <strong>Delivery Check:</strong>
                </p>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="delivery-input"
                  maxLength="6"
                />
                <button className="check-button">Check</button>
              </div>
            </div>
            <div className="ratings-reviews">Ratings and Reviews</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
