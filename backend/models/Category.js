// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter category name'],
        trim: true,
        unique: true, // Category names should be unique
        maxlength: [50, 'Category name cannot exceed 50 characters'],
    },
    description: {
        type: String,
        maxlength: [200, 'Category description cannot exceed 200 characters'],
        default: '',
    },
    // Optional: If you want to link categories to a user (e.g., admin who created it)
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false, // Set to true if every category must be linked to a user
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Update 'updatedAt' field on every save
categorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Category', categorySchema);
