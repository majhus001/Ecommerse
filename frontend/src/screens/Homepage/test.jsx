import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomeStyle.css";
import bannerImage from "../../assets/banner1.jpeg";
import bannerImage1 from "../../assets/banner2.jpeg";
import bannerImage2 from "../../assets/banner3.jpeg";
// import img1 from "../../assets/mobiles/samsungs24.jpeg";
// import img2 from "../../assets/mobiles/samsunga15.jpeg";
// import img3 from "../../assets/mobiles/realme10.jpeg";
// import img4 from "../../assets/mobiles/oppoa3x.jpeg";
// import img5 from "../../assets/mobiles/samsungs22.jpeg";
// import img6 from "../../assets/mobiles/infinix.webp";

const HomePage = () => {
  // const navigate = useNavigate();
   const [products, setProducts] = useState([]); // To store the products fetched from the server
   const [loading, setLoading] = useState(true); 

   const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data); // Store products in the state
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false); // Set loading to false if there is an error
    }
  };

  useEffect(() => {
      fetchProducts();
    }, []); // Empty dependency array ensures it runs only once when the component mounts
  
    if (loading) {
      return <div>Loading products...</div>; // Display loading message while fetching
    }

  // const electronics = [
  //   { id: 1, name: "Samsung S22", price: "$699", img: img1, route: "product" },
  //   { id: 3, name: "Samsung A15", price: "$399", img: img2,route: "product"  },
  //   { id: 2, name: "Realme 10", price: "$999", img: img3,route: "product"  },
  //   { id: 4, name: "Oppo A3x", price: "$199", img: img4 ,route: "product" },
  //   { id: 5, name: "Samsung S22", price: "$129", img: img5 ,route: "product" },
  //   { id: 6, name: "Infinix", price: "$699", img: img6,route: "product"  },
  //   { id: 7, name: "Laptop", price: "$999", img: bannerImage ,route: "product" },
  //   { id: 8, name: "Tablet", price: "$399", img: bannerImage,route: "product"  },
  //   { id: 9, name: "Smartwatch", price: "$199", img: bannerImage ,route: "product" },
  //   { id: 10, name: "Headphones", price: "$129", img: bannerImage ,route: "product" },
  // ];

  const clothing = [
    { id: 1, name: "T-shirt", price: "$25", img: bannerImage },
    { id: 2, name: "Jeans", price: "$49", img: bannerImage },
    { id: 3, name: "Jacket", price: "$89", img: bannerImage },
    { id: 4, name: "Shoes", price: "$59", img: bannerImage },
    { id: 5, name: "Hat", price: "$15", img: bannerImage },
    { id: 6, name: "T-shirt", price: "$25", img: bannerImage },
    { id: 7, name: "Jeans", price: "$49", img: bannerImage },
    { id: 8, name: "Jacket", price: "$89", img: bannerImage },
    { id: 9, name: "Shoes", price: "$59", img: bannerImage },
    { id: 10, name: "Hat", price: "$15", img: bannerImage },
  ];

  const homeAppliances = [
    { id: 1, name: "Refrigerator", price: "$799", img: bannerImage },
    { id: 2, name: "Microwave", price: "$149", img: bannerImage },
    { id: 3, name: "Washing Machine", price: "$499", img: bannerImage },
    { id: 4, name: "Vacuum Cleaner", price: "$199", img: bannerImage },
    { id: 5, name: "Air Purifier", price: "$249", img: bannerImage },
    { id: 6, name: "Refrigerator", price: "$799", img: bannerImage },
    { id: 7, name: "Microwave", price: "$149", img: bannerImage },
    { id: 8, name: "Washing Machine", price: "$499", img: bannerImage },
    { id: 9, name: "Vacuum Cleaner", price: "$199", img: bannerImage },
    { id: 10, name: "Air Purifier", price: "$249", img: bannerImage },
  ];

  const bannerImages = [bannerImage, bannerImage1, bannerImage2];
  const [currentImage, setCurrentImage] = useState(0);

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Image Scrolling
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  useEffect(() => {
    // Countdown Timer Logic
    const targetDate = new Date("2025-02-01T00:00:00"); // Set your target date
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
          <Link to="/login">
            <button id="login">LOGIN</button>
          </Link>
        </div>
      </nav>

      <div className="main-container">
        <div className="content">
          {/* Ad Banner */}
          <div className="banner-section">
            {/* Scrolling Banner */}
            <div className="ad-banner">
              <img
                src={bannerImages[currentImage]}
                alt={`Banner ${currentImage + 1}`}
              />
              <div className="banner-content">
                <h2>Special Offers</h2>
                <p>Up to 50% off on selected items!</p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="countdown-timer">
              <h3>Hurry up! Limited time offer:</h3>
              <div className="timer">
                <div>
                  <span>{timeLeft.days}</span> Days
                </div>
                <div>
                  <span>{timeLeft.hours}</span> Hours
                </div>
                <div>
                  <span>{timeLeft.minutes}</span> Minutes
                </div>
                <div>
                  <span>{timeLeft.seconds}</span> Seconds
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div className="categories">
            {/* mobiles */}
            <div className="category">
            <h3>Mobiles</h3>
            <div className="product-list">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                products.map((mobile) => (
                  <div className="product-card" key={mobile._id}>
                    <Link
                      to={`/${mobile.route}`}
                      state={{ name: mobile.name, price: mobile.price }}
                    >
                      <img
                        src={`http://localhost:5000${product.image}`} // Correct image path
                        alt={product.name}
                        className="product-image"
                      />
                      <h4>{mobile.name}</h4>
                      <p>{mobile.price}</p>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

            {/* Clothing */}
            <div className="category">
              <h3>Clothing</h3>
              <div className="product-list">
                {clothing.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.img} />
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Appliances */}
            <div className="category">
              <h3>Home Appliances</h3>
              <div className="product-list">
                {homeAppliances.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.img} />
                    <h4>{product.name}</h4>
                    <p>{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
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

export default HomePage;
