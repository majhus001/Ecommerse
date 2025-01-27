const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  OrderedItems: [
    {
      userId: {
        type: String,
        required: true,
      },
      itemId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      brand: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
      category: {
        type: String,
      },
      deliveryTime: {
        type: String,
      },
      rating: {
        type: Number,
        default: 0,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  OrderStatus: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Orderdetails", orderSchema);

router.post("/add", async (req, res) => {
  console.log("hi")
  const {
    userId,
    cartItems, 
    totalPrice,
    mobileNumber,
    deliveryAddress,
    paymentMethod,
  } = req.body;

  if (
    !userId ||
    !cartItems ||
    !totalPrice ||
    !mobileNumber ||
    !deliveryAddress ||
    !paymentMethod
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new order
    const newOrder = new Order({
      userId,
      OrderedItems: cartItems, // Properly mapping cartItems to OrderedItems
      totalPrice,
      mobileNumber,
      deliveryAddress,
      paymentMethod,
    });

    await newOrder.save();
    return res.status(201).json({
      message: "Order placed successfully!",
      orderId: newOrder._id, 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res
      .status(500)
      .json({ message: "Failed to place order. Please try again." });
  }
});

module.exports = router;
