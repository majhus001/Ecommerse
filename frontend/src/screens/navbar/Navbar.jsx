import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ userId, pageno = null }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrderPage, setIsOrderPage] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (pageno === "123") {
      setIsOrderPage(true);
    }
  }, [userId, pageno]);

  return (
    <nav className="hm-navbar">
      <div className="nav-logo">
        <h2 onClick={() => navigate("/home")}>SHOPIQUE</h2>
      </div>

      {!isOrderPage ? (
        <>
          <div className="nav-search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              aria-label="Search for products"
            />
            <button className="nav-btns">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
          <div className="nav-actions">
            <button
              className="nav-btns"
              onClick={() => {
                navigate("/cart", { state: { userId: userId } });
              }}
            >
              <i className="fas fa-shopping-cart"></i> Cart
            </button>
            {isLoggedIn ? (
              <button
                className="nav-btns"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <i className="fas fa-user"></i> My Profile
              </button>
            ) : (
              <button
                className="nav-btns"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <i className="fas fa-user"></i> Login
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="nav-actions">
          {isLoggedIn ? (
            <button
              className="nav-btns"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <i className="fas fa-user"></i> My Profile
            </button>
          ) : (
            <button
              className="nav-btns"
              onClick={() => {
                navigate("/login");
              }}
            >
              <i className="fas fa-user"></i> Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
