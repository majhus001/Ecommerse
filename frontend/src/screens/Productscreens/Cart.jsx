import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css"; // Assuming you have a separate CSS file for styling

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {}; // Retrieve userId from location state
  const [cartItems, setCartItems] = useState([]); // State to store cart items

  useEffect(() => {
    if (userId) {
      // Ensure fetch is only triggered when userId exists
      const fetchCartData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/cart/fetch`,
            {
              params: { userId },
            }
          );
          if (response.data.success) {
            // Add the quantity property to each item (default to 1)
            const itemsWithQuantity = response.data.cartItems.map((item) => ({
              ...item,
              quantity: item.quantity || 1, // If quantity doesn't exist, default it to 1
            }));
            setCartItems(itemsWithQuantity);
          } else {
            alert(response.data.message || "Failed to fetch cart data.");
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      };

      fetchCartData();
    }
  }, [userId]); // Run the effect only when userId changes

  const handleQuantityChange = (itemId, change) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) } // Prevent quantity from going below 1
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const HandleShopNow = () => {
    navigate("/home", { state: { userId } }); // Corrected navigate call
  };

  return (
    <div>
      <nav className="hm-navbar">
        <div className="nav-logo">
          <h2 onClick={() => navigate("/home")}>SHOPIQUE</h2>
        </div>
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
          <button className="nav-btns" onClick={ ()=>{ navigate('/cart', { state: { userId: userId } })}}>
            <i className="fas fa-shopping-cart"></i> Cart
          </button>
          <button className="nav-btns" onClick={ () => {navigate('/login')}}>
            <i className="fas fa-user"></i> Login
          </button>
        </div>
      </nav>
    
    <div className="cart-container">
      
    <h1 className="cart-title">Your Cart</h1>
      <div className="cart-prod">
        
        {userId ? (
          cartItems.length > 0 ? (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-brand">
                      <strong>Brand:</strong> {item.brand}
                    </p>
                    <p className="cart-item-description">{item.description}</p>
                    <div className="cart-item-price">
                      <strong>Price: </strong> ₹{item.price}
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                        disabled={item.quantity <= 1}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button>buy</button>
            </div>
          ) : (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="shop-now-btn" onClick={HandleShopNow}>
                Shop Now
              </button>
            </div>
          )
        ) : (
          <p>Please log in to view your cart.</p>
        )}

        <div className="cart-price-details">
          <h3>Price Details</h3>
          <div>
            <h4>Total items: {cartItems.length}</h4>
            <h4>Discount: ₹0</h4> {/* Add dynamic discount if needed */}
            <h4>Platform Fee: ₹50</h4> {/* Add dynamic fee if needed */}
            <h4>Delivery Fee: ₹20</h4>{" "}
            {/* Add dynamic delivery fee if needed */}
          </div>
          <div>
            {cartItems.length > 0 && (
              <div className="total-price">
                <strong>Total Price: ₹{calculateTotalPrice()}</strong>
              </div>
            )}
            <button className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
