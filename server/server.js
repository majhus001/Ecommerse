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


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
