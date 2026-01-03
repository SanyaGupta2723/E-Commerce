// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // To check product existence and stock

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private (requires JWT token)
exports.getCart = async (req, res) => {
    try {
        // Find the cart for the logged-in user (req.user.id comes from 'protect' middleware)
        // Populate product details for each item in the cart from the Product model
        // We select 'name', 'price', 'imageUrl', 'stock' from the Product model
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price imageUrl stock');

        if (!cart) {
            // If no cart exists for the user, return an empty cart structure
            return res.status(200).json({ success: true, cart: { user: req.user.id, items: [] } });
        }

        // Format cart items to match frontend structure (item.product.id, item.product.image, item.product.inStock)
        const formattedCartItems = cart.items.map(item => ({
            product: {
                id: item.product._id.toString(), // Convert MongoDB _id to string 'id' for frontend
                name: item.product.name,
                price: item.product.price,
                image: item.product.imageUrl, // Map backend 'imageUrl' to frontend 'image'
                inStock: item.product.stock, // Map backend 'stock' to frontend 'inStock'
                // Add other product properties if your frontend expects them (e.g., category, description, rating)
                // category: item.product.category, // If you populate category from Product model
            },
            quantity: item.quantity,
        }));

        res.status(200).json({ success: true, cart: { user: cart.user, items: formattedCartItems } });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Server error fetching cart', error: error.message });
    }
};

// @desc    Add item to cart or update quantity if item exists
// @route   POST /api/cart
// @access  Private (requires JWT token)
exports.addToCart = async (req, res) => {
    // Frontend will send productId and quantity
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Product ID and a valid quantity are required' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if requested quantity exceeds available stock
        if (product.stock < quantity) {
            return res.status(400).json({ message: `Only ${product.stock} units of ${product.name} are available in stock.` });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (cart) {
            // Cart exists for the user
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                // Product already exists in cart, update its quantity
                const existingItem = cart.items[itemIndex];
                const newQuantity = existingItem.quantity + quantity;

                // Check stock again for the combined quantity
                if (product.stock < newQuantity) {
                    return res.status(400).json({ message: `Cannot add more. Only ${product.stock} units of ${product.name} are available in stock.` });
                }
                existingItem.quantity = newQuantity;
            } else {
                // Product not in cart, add new item
                cart.items.push({
                    product: productId,
                    name: product.name,
                    image: product.imageUrl, // Snapshot backend imageUrl to cart item's image
                    price: product.price, // Snapshot price
                    quantity,
                });
            }
            await cart.save();
        } else {
            // No cart exists for user, create a new one
            cart = await Cart.create({
                user: req.user.id,
                items: [{
                    product: productId,
                    name: product.name,
                    image: product.imageUrl,
                    price: product.price,
                    quantity,
                }],
            });
        }

        // Re-populate and format the cart for the response, similar to getCart
        const updatedCart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price imageUrl stock');
        const formattedCartItems = updatedCart.items.map(item => ({
            product: {
                id: item.product._id.toString(),
                name: item.product.name,
                price: item.product.price,
                image: item.product.imageUrl,
                inStock: item.product.stock,
            },
            quantity: item.quantity,
        }));

        res.status(200).json({ success: true, message: 'Item added to cart', cart: { user: updatedCart.user, items: formattedCartItems } });
    } catch (error) {
        console.error("Error adding to cart:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ message: 'Server error adding to cart', error: error.message });
    }
};

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:productId
// @access  Private (requires JWT token)
exports.updateCartItemQuantity = async (req, res) => {
    const { productId } = req.params; // Product ID from URL parameter
    const { quantity } = req.body; // New quantity from request body

    if (!quantity || quantity <= 0) {
        return res.status(400).json({ message: 'A valid quantity (greater than 0) is required' });
    }

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in database' });
        }

        // Check stock for the new requested quantity
        if (product.stock < quantity) {
            return res.status(400).json({ message: `Only ${product.stock} units of ${product.name} are available in stock.` });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        // Re-populate and format the cart for the response
        const updatedCart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price imageUrl stock');
        const formattedCartItems = updatedCart.items.map(item => ({
            product: {
                id: item.product._id.toString(),
                name: item.product.name,
                price: item.product.price,
                image: item.product.imageUrl,
                inStock: item.product.stock,
            },
            quantity: item.quantity,
        }));

        res.status(200).json({ success: true, message: 'Cart item quantity updated', cart: { user: updatedCart.user, items: formattedCartItems } });
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ message: 'Server error updating cart item quantity', error: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private (requires JWT token)
exports.removeCartItem = async (req, res) => {
    const { productId } = req.params;

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }

        // Filter out the item to be removed
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        if (cart.items.length === initialLength) {
            // If length didn't change, item wasn't found
            return res.status(404).json({ message: 'Product not found in cart to remove' });
        }

        await cart.save();

        // Re-populate and format the cart for the response
        const updatedCart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price imageUrl stock');
        const formattedCartItems = updatedCart.items.map(item => ({
            product: {
                id: item.product._id.toString(),
                name: item.product.name,
                price: item.product.price,
                image: item.product.imageUrl,
                inStock: item.product.stock,
            },
            quantity: item.quantity,
        }));

        res.status(200).json({ success: true, message: 'Item removed from cart', cart: { user: updatedCart.user, items: formattedCartItems } });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }
        res.status(500).json({ message: 'Server error removing item from cart', error: error.message });
    }
};

// @desc    Clear user's entire cart
// @route   DELETE /api/cart/clear
// @access  Private (requires JWT token)
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(200).json({ success: true, message: 'Cart is already empty' });
        }

        cart.items = []; // Empty the items array
        await cart.save();

        res.status(200).json({ success: true, message: 'Cart cleared successfully', cart: { user: cart.user, items: [] } });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: 'Server error clearing cart', error: error.message });
    }
};
