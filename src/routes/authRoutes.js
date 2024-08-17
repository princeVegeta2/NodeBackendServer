// src/routes/authRoutes.js
const express = require('express');
const { signup, login, checkBuilderAccess, getUsername, getEmail } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route to check builder access, get username, get email
router.get('/check-builder-access', authenticate, checkBuilderAccess);
router.get('/get-username', authenticate, getUsername);
router.get('/get-email', authenticate, getEmail);

module.exports = router;
