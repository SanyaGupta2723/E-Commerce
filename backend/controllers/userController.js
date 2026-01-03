const User = require('../models/User'); // <<<--- IMP: User model ko import karein
const asyncHandler = require('express-async-handler'); // For handling async errors easily

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is populated by the 'protect' middleware after token verification
    // This is the actual logic that was previously in authController.js
    const user = await User.findById(req.user.id).select('-password'); // Password exclude karein

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            favorites: user.favorites // Include favorites here
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // If password is provided, hash it
        if (req.body.password) {
            user.password = req.body.password; // Pre-save hook in User model will hash this
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            // Token is NOT regenerated on profile update typically,
            // unless password change requires new token for security.
            // If you want to send a new token, you'll need generateToken helper here.
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user password
// @route   PUT /api/users/profile/password
// @access  Private
const updateUserPassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        if (req.body.password) {
            user.password = req.body.password; // Mongoose pre-save hook will hash this
            await user.save();
            res.json({ message: 'Password updated successfully' });
        } else {
            res.status(400);
            throw new Error('New password is required');
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password'); // Password exclude karein
    res.json(users);
});

// @desc    Get user by ID (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user role (Admin only)
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.role = req.body.role || user.role; // Assume role is sent in body
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: user._id }); // Use deleteOne for Mongoose 6+
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get user's favorite products
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate('favorites'); // 'favorites' array ko populate karein
    if (user) {
        res.json({ favorites: user.favorites });
    } else {
        res.status(404);
        throw new Error('User not found or no favorites.');
    }
});

// @desc    Toggle (Add/Remove) a product from user's favorites
// @route   POST /api/users/favorites/toggle
// @access  Private
const toggleFavorite = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);

    if (user) {
        const productObjectId = productId; // Assuming productId is already a valid ObjectId string
        const isFavorite = user.favorites.includes(productObjectId);

        if (isFavorite) {
            // Remove from favorites
            user.favorites = user.favorites.filter(
                (favId) => favId.toString() !== productObjectId.toString()
            );
            await user.save();
            res.json({ message: 'Product removed from favorites', isFavorite: false });
        } else {
            // Add to favorites
            user.favorites.push(productObjectId);
            await user.save();
            res.json({ message: 'Product added to favorites', isFavorite: true });
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


module.exports = {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getFavorites,
    toggleFavorite,
};