// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        unique: true, // Product names should ideally be unique
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0,
    },
    imageUrl: { // Corresponds to frontend's 'image' field
        type: String,
        default: 'https://placehold.co/600x400/cccccc/ffffff?text=No+Image', // Placeholder image
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
        // You might want an enum here for predefined categories:
        // enum: ['Electronics', 'Apparel', 'Books', 'Crockery', 'Watches', 'Home & Garden'],
    },
    stock: { // Corresponds to frontend's 'inStock' field
        type: Number,
        required: [true, 'Please enter product stock'],
        default: 0,
        min: [0, 'Stock cannot be negative'],
    },
    ratings: { // Corresponds to frontend's 'rating' field (average rating)
        type: Number,
        default: 0,
    },
    numOfReviews: { // Number of reviews for this product
        type: Number,
        default: 0,
    },
    // Reference to the user who created this product (optional, but good for tracking)
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // References the 'User' model
        required: false, // Set to true if you want every product to be linked to a user
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

// Update 'updatedAt' field on every save/update
productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema);

