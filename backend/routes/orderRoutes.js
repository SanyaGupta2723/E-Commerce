// routes/orderRoutes.js
const express = require('express');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import protect and admin middleware

const router = express.Router();

// User routes (require authentication)
router.route('/')
    .post(protect, createOrder) // Create a new order
    .get(protect, getOrders);   // Get all orders (user's or all for admin)

router.route('/:id')
    .get(protect, getOrderById); // Get a single order by ID

// Admin-only routes (require authentication and admin role)
router.route('/:id/status')
    .put(protect, admin, updateOrderStatus); // Update order status

router.route('/:id')
    .delete(protect, admin, deleteOrder); // Delete an order

module.exports = router;