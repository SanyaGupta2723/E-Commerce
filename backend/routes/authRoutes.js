// Example: backend/routes/authRoutes.js
const express = require('express');
const {
    signup,
    verifyOtp,
    resendOtp,
    login,
    verifyLoginOtp,
    resendLoginOtp,
    logout
} = require('../controllers/authController'); // All these functions are now in authController

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', login);
router.post('/verify-login-otp', verifyLoginOtp);
router.post('/resend-login-otp', resendLoginOtp);
router.get('/logout', logout); // Or use .post if it triggers server-side invalidation

module.exports = router;