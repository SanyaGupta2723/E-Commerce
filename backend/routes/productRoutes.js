// routes/productRoutes.js

const express = require('express');
const multer = require('multer');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductsCSV,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// PUBLIC
router.get('/', getProducts);
router.get('/:id', getProductById);

// ADMIN
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

// 🔥 BULK CSV UPLOAD
router.post(
    '/upload-csv',
    protect,
    admin,
    upload.single('file'),
    uploadProductsCSV
);

module.exports = router;
