// models/Cart.js
const mongoose = require('mongoose');

// Schema for individual items within the cart
const cartItemSchema = new mongoose.Schema({
    product: { // Reference to the Product model's _id
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    // Snapshot of product details at the time of adding to cart.
    // This helps if product details change later, the cart reflects
    // what was added.
    name: {
        type: String,
        required: true,
    },
    image: { // Corresponds to frontend's 'image' field (which maps to backend's 'imageUrl')
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1'],
    },
});

// Schema for the entire cart, linked to a user
const cartSchema = new mongoose.Schema({
    user: { // Reference to the User model's _id
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // Each user should have only one cart
    },
    items: [cartItemSchema], // Array of cart items
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update 'updatedAt' field on every save
cartSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Cart', cartSchema);
