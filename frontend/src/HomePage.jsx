import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomePage.css';


const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState("00:00:00");

  const banners = [/* Add your banner data */];
  const categories = [/* Add your categories data */];
  const trends = [/* Add trending products data */];
  const products = [/* Add popular products data */];
  const featured = [/* Add featured products data */];
  const suggestions = [/* Add search suggestions data */];

  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">E-Commerce</h1>
        <i className="icon person-circle-outline"></i>
      </header>

      <div className="search-container">
        <i className="icon search-outline"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Search for products or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="spinner">Loading...</div>
      ) : searchQuery.length > 0 ? (
        suggestions.filter((item) =>
          item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        ).length > 0 ? (
          <div className="suggestions-container">
            <ul className="suggestions-list">
              {suggestions
                .filter((item) =>
                  item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                )
                .slice(0, 6)
                .map((item) => (
                  <li
                    key={item.name}
                    className="suggestion"
                    onClick={() => navigate(item.route, { state: { itemData: item } })}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <p className="not-found-text">No products found</p>
        )
      ) : null}

      <main>
        <div className="banner-container">
          {banners.map((banner, index) => (
            <img key={index} src={banner.image} alt="Banner" className="banner-image" />
          ))}
        </div>

        <div className="timer-container">
          <p className="timer-text">Deal ends in: {timer}</p>
        </div>

        <section className="categories-container">
          <h2 className="section-title">Categories</h2>
          <div className="categories">
            {categories.map((category) => (
              <div key={category.id} className="category">
                <i className={`icon ${category.icon}`}></i>
                <p className="category-text">{category.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="products-container">
          <h2 className="section-title">Trending Shirts</h2>
          <div className="products">
            {trends.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt="Product" className="product-image" />
                <p className="product-title">{product.title}</p>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="products-container">
          <h2 className="section-title">Popular Products</h2>
          <div className="products">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt="Product" className="product-image" />
                <p className="product-title">{product.title}</p>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="products-container">
          <h2 className="section-title">Recommended Products</h2>
          <div className="products">
            {featured.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt="Product" className="product-image" />
                <p className="product-title">{product.title}</p>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-icon" onClick={() => navigate("/home")}>
            <i className="icon home-outline"></i>
            <p>Home</p>
          </div>
          <div className="footer-icon" onClick={() => navigate("/cart")}>
            <i className="icon cart-outline"></i>
            <p>Cart</p>
          </div>
          <div className="footer-icon" onClick={() => {}}>
            <i className="icon cube-outline"></i>
            <p>Orders</p>
          </div>
          <div className="footer-icon" onClick={() => navigate("/profile")}>
            <i className="icon person-circle-outline"></i>
            <p>Profile</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
