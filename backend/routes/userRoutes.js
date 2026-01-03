const express = require('express');
const {
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    getFavorites,
    toggleFavorite,
} = require('../controllers/userController'); // Ab ye functions actual mein honge
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/password', protect, updateUserPassword);

router.get('/favorites', protect, getFavorites);
router.post('/favorites/toggle', protect, toggleFavorite);

router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id/role', protect, admin, updateUserRole);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;