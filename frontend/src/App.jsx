import React from "react";
import "./App.css"; // Create this file for styling (optional but recommended)
import bannerImage from './assets/banner.jpeg';

const App = () => {
  // Dummy product data
  const categories = [
    {
      name: "Electronics",
      products: [
        { id: 1, name: "Smartphone", price: "$699" },
        { id: 2, name: "Laptop", price: "$999" },
        { id: 3, name: "Tablet", price: "$399" },
        { id: 4, name: "Smartwatch", price: "$199" },
        { id: 5, name: "Headphones", price: "$129" },
      ],
    },
    {
      name: "Clothing",
      products: [
        { id: 6, name: "T-shirt", price: "$25" },
        { id: 7, name: "Jeans", price: "$49" },
        { id: 8, name: "Jacket", price: "$89" },
        { id: 9, name: "Shoes", price: "$59" },
        { id: 10, name: "Hat", price: "$15" },
      ],
    },
    {
      name: "Home Appliances",
      products: [
        { id: 11, name: "Refrigerator", price: "$799" },
        { id: 12, name: "Microwave", price: "$149" },
        { id: 13, name: "Washing Machine", price: "$499" },
        { id: 14, name: "Vacuum Cleaner", price: "$199" },
        { id: 15, name: "Air Purifier", price: "$249" },
      ],
    },
  ];

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <h2>E-Commerce Website</h2>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search for products..." />
          <button>Search</button>
          <button id="login">LOGIN</button>
        </div>
      </nav>

      <div className="main-container">
        <div className="content">
          {/* Ad Banner */}
          <div className="ad-banner">
            <img src={bannerImage} alt="Ad Banner" />
            <h2>Special Offers</h2>
            <p>Up to 50% off on selected items!</p>
          </div>

          {/* Product Categories */}
          <div className="categories">
            {categories.map((category) => (
              <div className="category" key={category.name}>
                <h3>{category.name}</h3>
                <div className="product-list">
                  {category.products.map((product) => (
                    <div className="product-card" key={product.id}>
                      <h4>{product.name}</h4>
                      <p>{product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 E-Commerce Website. All rights reserved.</p>
          <div className="footer-links">
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
