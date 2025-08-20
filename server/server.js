// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sports-shop";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  });

// Models
const Product = require("./models/Product");
const Order = require("./models/Orders");
const User = require("./models/User");

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Sports Shop API");
});

// ✅ Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Place an order
app.post("/api/orders", async (req, res) => {
  console.log('Received order request:', req.body);
  
  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    console.log('Invalid productId:', productId);
    return res.status(400).json({ message: "Invalid productId format" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log('Product not found for id:', productId);
      return res.status(404).json({ message: "Product not found" });
    }

    // Create order with product reference
    const order = new Order({ productId, quantity });
    await order.save();
    console.log('Order saved successfully');

    // Fetch the order with populated product data
    const populatedOrder = await Order.findById(order._id).populate('productId');
    console.log('Populated order:', populatedOrder);

    res.status(201).json({ 
      message: "Order placed successfully", 
      order: populatedOrder 
    });
  } catch (err) {
    console.error("❌ Failed to place order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get all orders with product details
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate('productId', 'name price description imageUrl');
    console.log('Fetched orders:', orders);
    res.json(orders);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Create new user
app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
