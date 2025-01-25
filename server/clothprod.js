const express = require("express");
const multer = require("multer"); 
const path = require("path");
const mongoose = require("mongoose");

const router = express.Router();

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  stock: Number,
  description: String,
  route: String,
});

const Product = mongoose.model("clothingproduct", productSchema);

// Multer Storage for cloths
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/clothings/"); // Folder for mobile images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Serve cloth Images
router.use("/uploads/clothings/", express.static("uploads/clothings"));

// Add cloth Product
router.post("/prod", upload.single("image"), async (req, res) => {
  try {
    
    const { name, price, stock, description, route } = req.body;
    const imagePath = req.file ? `/uploads/clothings/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      route,
      image: imagePath,
    });

    await newProduct.save();

    res.status(201).json({ message: "cloth product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add cloth product" });
  }
});

// Fetch cloth Products
router.get("/fetch", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
    
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Search cloth Products
router.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(10); // Limit to 10 results
 
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Error searching products");
  }
});

// Delete cloth Product
router.delete("/:name", async (req, res) => {
  try {
    const productName = req.params.name;
    const result = await Product.deleteOne({ name: productName });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

module.exports = router;
