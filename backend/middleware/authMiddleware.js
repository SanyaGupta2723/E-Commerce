// middleware/authMiddleware.js
const jwt = require('jsonwebtoken'); // JWTs ko verify karne ke liye
const User = require('../models/User'); // User model ko import karein, taaki user ko database mein find kar sakein

// 'protect' middleware: Yeh check karta hai ki user authenticated hai ya nahi
const protect = async (req, res, next) => {
    let token;

    // Check karein ki Authorization header mein token hai aur 'Bearer' se start ho raha hai
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Header se token extract karein (e.g., "Bearer YOUR_TOKEN" se "YOUR_TOKEN" nikalna)
            token = req.headers.authorization.split(' ')[1];

            // Token ko verify karein apne JWT_SECRET ka use karke
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Token mein jo userId hai, usse database mein user ko find karein
            // Aur password ko response mein na bhejein (select: false in User model)
            req.user = await User.findById(decoded.id).select('-password');

            // Agar user nahi mila token ke liye
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found for token' });
            }

            next(); // Agar sab theek hai, toh agle middleware ya route handler par jaayen
        } catch (error) {
            console.error('Token verification error:', error.message);
            // JWT specific errors handle karein
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Not authorized, token expired' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Not authorized, invalid token' });
            }
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // Agar token hi nahi mila header mein
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// 'admin' middleware: Yeh check karta hai ki authenticated user 'admin' role ka hai ya nahi
const admin = (req, res, next) => {
    // 'req.user' object 'protect' middleware se populate hota hai
    if (req.user && req.user.role === 'admin') {
        next(); // User admin hai, toh aage badho
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // Access denied (Forbidden)
    }
};

module.exports = { protect, admin }; // Dono middlewares ko export karein
