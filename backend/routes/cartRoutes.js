// routes/cartRoutes.js
const express = require('express');
const {
    getCart,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

const router = express.Router();

// All cart routes require authentication
// GET /api/cart - Get user's cart
// POST /api/cart - Add item to cart
router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

// PUT /api/cart/:productId - Update item quantity in cart
// DELETE /api/cart/:productId - Remove item from cart
router.route('/:productId')
    .put(protect, updateCartItemQuantity)
    .delete(protect, removeCartItem);

// DELETE /api/cart/clear - Clear user's entire cart
router.delete('/clear', protect, clearCart);

module.exports = router;
