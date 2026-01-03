 // app.js
const express = require('express');
const dotenv = require('dotenv'); // dotenv ko sirf ek baar require karna hai
const cors = require('cors');
const connectDB = require('./config/db'); // Database connection utility
// const path = require("path"); // Agar path ka use nahi ho raha toh hata sakte hain
// const mongoose = require("mongoose"); // Agar directly use nahi ho raha toh hata sakte hain

// Load environment variables from .env file
// Yeh sabse pehle hona chahiye, taaki saare environment variables available ho
dotenv.config();

// Import all route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect to MongoDB database
// Yeh bhi sirf ek baar call hona chahiye
connectDB();

// Initialize Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Body parser for JSON data

// Basic Route for testing server status
app.get('/', (req, res) => {
    res.send('E-commerce API is running...');
});

// Mount specific routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Define the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
