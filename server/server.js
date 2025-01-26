const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./Authentication");
const mobileRoutes = require("./mobileprod");
const clothingRoutes = require("./clothprod");
const homeappliRoutes = require("./homeappli");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/mobiles", mobileRoutes);
app.use("/api/clothings", clothingRoutes);
app.use("/api/hoappliances", homeappliRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Ecommerse")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));




  const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    stock: { type: Number },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    deliverytime: { type: String },
    rating: { type: Number },
    addedAt: { type: Date, default: Date.now }, // Timestamp for when the product was added
  });
  
  const Cart = mongoose.model("Cart", cartSchema);
  
  // API Endpoint
  app.post("/api/cart", async (req, res) => {
    try {
      const { userId, name, price, brand, stock, description, image, category, deliverytime, rating } = req.body;
  
      // Validate required fields
      if (!userId || !name || !price) {
        return res.status(400).json({ success: false, message: "Missing required fields: userId, name, or price." });
      }
  
      // Create a new cart item
      const cartItem = new Cart({
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
      });
  
      // Save the cart item to the database
      await cartItem.save();
  
      res.status(201).json({ success: true, message: "Product added to cart successfully." });
    } catch (error) {
      console.error("Error saving to cart:", error);
      res.status(500).json({ success: false, message: "Internal server error." });
    }
  });


  app.get("/api/cart/fetch", async (req, res) => {
    const { userId } = req.query; 
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required to fetch the cart.",
      });
    }
  
    try {
      // Fetch cart items for the user from the database
      const cartItems = await Cart.find({ userId });
  
      if (!cartItems || cartItems.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No items found in the cart for this user.",
        });
      }
  
      res.status(200).json({
        success: true,
        cartItems,
      });
    } catch (error) {
      console.error("Error fetching cart data:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the cart data.",
      });
    }
  });
  


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
