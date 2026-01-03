// controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product'); // To update product stock
const Cart = require('../models/Cart');     // To clear user's cart after order

// Helper function to format order for frontend consistency
const formatOrderForFrontend = (order) => {
    return {
        id: order._id.toString(),
        userId: order.user.toString(),
        items: order.items.map(item => ({
            product: {
                id: item.product.toString(),
                name: item.name,
                price: item.price,
                image: item.image, // Directly use 'image' as stored in orderItemSchema
            },
            quantity: item.quantity,
        })),
        total: order.totalPrice, // Map backend 'totalPrice' to frontend 'total'
        status: order.orderStatus, // Map backend 'orderStatus' to frontend 'status'
        date: order.createdAt.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
        shippingAddress: order.shippingAddress,
    };
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (requires JWT token)
exports.createOrder = async (req, res) => {
    const { shippingAddress, paymentMethod } = req.body; // Frontend sends address and payment method

    if (!shippingAddress || !paymentMethod) {
        return res.status(400).json({ message: 'Shipping address and payment method are required' });
    }

    try {
        // 1. Get the user's cart
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product'); // Populate product details to get stock

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty' });
        }

        let orderItems = [];
        let totalPrice = 0;

        // 2. Process cart items and update product stock
        for (const cartItem of cart.items) {
            const product = cartItem.product; // This is the populated Product document

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${cartItem.product.toString()} not found.` });
            }
            if (product.stock < cartItem.quantity) {
                return res.status(400).json({ message: `Insufficient stock for ${product.name}. Only ${product.stock} available.` });
            }

            // Decrease product stock
            product.stock -= cartItem.quantity;
            await product.save();

            // Add item to orderItems (snapshot of details)
            orderItems.push({
                product: product._id, // Store reference to original product
                name: product.name,
                quantity: cartItem.quantity,
                image: product.imageUrl, // Snapshot of image URL
                price: product.price, // Snapshot of price
            });

            totalPrice += product.price * cartItem.quantity;
        }

        // 3. Create the order
        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            orderStatus: 'pending', // Default status
        });

        // 4. Clear the user's cart after successful order creation
        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order: formatOrderForFrontend(order), // Send formatted order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error placing order', error: error.message });
    }
};

// @desc    Get all orders (Admin only) or logged-in user's orders
// @route   GET /api/orders
// @access  Private (Admin or User)
exports.getOrders = async (req, res) => {
    try {
        let orders;
        if (req.user.role === 'admin') {
            // Admin can see all orders, populate user info
            orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
        } else {
            // Regular user can only see their own orders
            orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        }

        const formattedOrders = orders.map(order => formatOrderForFrontend(order));

        res.status(200).json({
            success: true,
            count: formattedOrders.length,
            orders: formattedOrders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: 'Server error fetching orders', error: error.message });
    }
};

// @desc    Get single order details
// @route   GET /api/orders/:id
// @access  Private (User who owns order or Admin)
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure user is authorized to view this order
        if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.status(200).json({ success: true, order: formatOrderForFrontend(order) });
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID format' });
        }
        res.status(500).json({ message: 'Server error fetching order', error: error.message });
    }
};

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Order status is required' });
    }

    try {
        let order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure user is admin (handled by middleware)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update order status' });
        }

        // Update status and deliveredAt if status is 'delivered'
        order.orderStatus = status;
        if (status === 'delivered' && !order.deliveredAt) {
            order.deliveredAt = Date.now();
        } else if (status !== 'delivered' && order.deliveredAt) {
            order.deliveredAt = undefined; // Clear deliveredAt if status changes from delivered
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order: formatOrderForFrontend(order),
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID format' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error updating order status', error: error.message });
    }
};

// @desc    Delete order (Admin only)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Ensure user is admin (handled by middleware)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete order' });
        }

        await order.deleteOne(); // Use deleteOne() for Mongoose 6+

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (error) {
        console.error("Error deleting order:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid order ID format' });
        }
        res.status(500).json({ message: 'Server error deleting order', error: error.message });
    }
};
