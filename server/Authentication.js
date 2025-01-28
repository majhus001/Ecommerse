const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", UserSchema);

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    console.log("Signup success");
    res.status(201).json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid user" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    console.log("Login success");
    res.status(200).json({ success: true, message: "Login successful!",userId : user._id});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again." });
  }
});


// fetch User Name
router.get("/fetch/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({"_id" : userId});

    console.log("User Name : ",user.username)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", data: user.username });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
