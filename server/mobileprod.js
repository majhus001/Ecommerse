const express = require("express");
const multer = require("multer"); 
const path = require("path");
const mongoose = require("mongoose");

const router = express.Router();

// Product Schema
const mobileSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  brand: { type: String }, 
  image: { type: String }, 
  rating: { type: Number, default: 0 },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
  route: { type: String },
  category: { type: String, required: true }, 
  deliverytime: { type: String },
 },
 { timestamps: true },
);

const Product = mongoose.model("mobileproduct", mobileSchema);

// Multer Storage for Mobiles
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/mobiles/"); // Folder for mobile images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Serve Mobile Images
router.use("/uploads/mobiles/", express.static("uploads/mobiles"));

router.post("/prod", upload.single("image"), async (req, res) => {
  try {
    const { name, price, brand, rating, description, stock, route, category, deliverytime } = req.body;
    
    // Store image path in array (use req.file for uploaded file)
    const imagePath = req.file ? `/uploads/mobiles/${req.file.filename}` : null;
  
    const newProduct = new Product({
      name,
      price,
      brand,
      image: imagePath , 
      rating,
      description,
      stock,
      route,
      category,
      deliverytime,

    });

    console.log(deliverytime)

    await newProduct.save();

    res.status(201).json({ message: "Mobile product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add mobile product" });
  }
});


// Fetch Mobile Products
router.get("/fetch", async (req, res) => {
  try {
    const products = await Product.find().limit(10); // Fetch all products
    console.log(products)
    res.status(200).json(products);
    
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Search Mobile Products
router.get("/search", async (req, res) => {
  const query = req.query.query;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(10); // Limit to 10 results
   console.log(products)
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Error searching products");
  }
});

// Delete Mobile Product
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




router.put("/update/:name", upload.single("image"), async (req, res) => {
  const { name } = req.params;
  const { price, brand, rating, description, stock, route, category, deliverytime, image } = req.body;

  try {
    const updateFields = {
      price,
      brand,
      image,
      rating,
      description,
      stock,
      route,
      category,
      deliverytime,
      // updatedAt: Date.now(), 
    };

    console.log(deliverytime);
    // console.log(updatedAt);

    // Handle image update
    if (req.file) {
      updateFields.image = `/uploads/mobiles/${req.file.filename}`;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { name },
      { $set: { ...updateFields, updatedAt: Date.now() } },
      { new: true }
    );
    

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

module.exports = router;