const express = require('express');
const { checkBuilderAccess, getUsername, getEmail } = require('../controllers/userDataController');
const authenticate = require('../middleware/authenticate'); // Import the authentication middleware
const router = express.Router();

// Protected route to check builder access, get username, get email
router.get('/check-builder-access', authenticate, checkBuilderAccess);
router.get('/get-username', authenticate, getUsername);
router.get('/get-email', authenticate, getEmail);

module.exports = router;