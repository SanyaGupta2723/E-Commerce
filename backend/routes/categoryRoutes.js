// routes/categoryRoutes.js
const express = require('express');
const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware'); // Import protect and admin middleware

const router = express.Router();

// Public routes
router.route('/')
    .get(getCategories); // Get all categories

router.route('/:id')
    .get(getCategoryById); // Get single category by ID

// Admin-only routes (require both authentication and admin role)
router.route('/')
    .post(protect, admin, createCategory); // Create a new category

router.route('/:id')
    .put(protect, admin, updateCategory)    // Update a category by ID
    .delete(protect, admin, deleteCategory); // Delete a category by ID

module.exports = router;