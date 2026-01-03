// controllers/categoryController.js
const Category = require('../models/Category'); // Import the Category model

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 }); // Sort by name alphabetically

        res.status(200).json({
            success: true,
            count: categories.length,
            categories,
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: 'Server error fetching categories', error: error.message });
    }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ success: true, category });
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }
        res.status(500).json({ message: 'Server error fetching category', error: error.message });
    }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Ensure name is provided
        if (!name) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const category = await Category.create({
            name,
            description,
            user: req.user.id, // Link category to the creating admin user
        });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category,
        });
    } catch (error) {
        console.error("Error creating category:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        // Handle duplicate key error (if category name is unique)
        if (error.code === 11000) {
            return res.status(400).json({ message: `Category with name '${req.body.name}' already exists.` });
        }
        res.status(500).json({ message: 'Server error creating category', error: error.message });
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
exports.updateCategory = async (req, res) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Ensure user is admin (handled by middleware, but good for clarity)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update category' });
        }

        // Only allow updating name and description
        const updateFields = {};
        if (req.body.name !== undefined) updateFields.name = req.body.name;
        if (req.body.description !== undefined) updateFields.description = req.body.description;

        // If no fields to update, return early
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        category = await Category.findByIdAndUpdate(req.params.id, updateFields, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators on update
            useFindAndModify: false, // Use native findOneAndUpdate
        });

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            category,
        });
    } catch (error) {
        console.error("Error updating category:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        if (error.code === 11000) {
            return res.status(400).json({ message: `Category with name '${req.body.name}' already exists.` });
        }
        res.status(500).json({ message: 'Server error updating category', error: error.message });
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Ensure user is admin (handled by middleware)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete category' });
        }

        // IMPORTANT: Consider what happens to products in this category.
        // You might want to:
        // 1. Set their category field to null/undefined.
        // 2. Assign them to a "Uncategorized" category.
        // 3. Prevent deletion if products exist in this category.
        // For simplicity, this example just deletes the category.
        // await Product.updateMany({ category: category.name }, { $set: { category: 'Uncategorized' } });

        await category.deleteOne(); // Use deleteOne() for Mongoose 6+

        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        });
    } catch (error) {
        console.error("Error deleting category:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid category ID format' });
        }
        res.status(500).json({ message: 'Server error deleting category', error: error.message });
    }
};
