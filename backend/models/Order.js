// models/Order.js
const mongoose = require('mongoose');

// Schema for individual items within an order
const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true }, // Snapshot of product image URL (from product.imageUrl)
    price: { type: Number, required: true }, // Snapshot of product price
    product: { // Reference to the actual product (for analytics, etc.)
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
});

// Schema for shipping address (can be reused or embedded)
const shippingAddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
    user: { // Reference to the user who placed the order
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [orderItemSchema], // Array of order items
    shippingAddress: shippingAddressSchema, // Embedded shipping address
    paymentMethod: { // Placeholder for payment method
        type: String,
        required: [true, 'Please select payment method'],
        enum: ['Cash On Delivery', 'Card', 'UPI'], // Example payment methods
    },
    totalPrice: { // Total price of the order (matches frontend 'total')
        type: Number,
        required: true,
        default: 0.0,
    },
    orderStatus: { // Matches frontend 'status'
        type: String,
        required: true,
        default: 'pending', // Initial status
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    },
    deliveredAt: { // Date when the order was delivered
        type: Date,
    },
    createdAt: { // Date when the order was placed (matches frontend 'date')
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
