// src/routes/projectDataRoutes.js
const express = require('express');
const { createProject } = require('../controllers/projectDataController');
const authenticate = require('../middleware/authenticate'); 

const router = express.Router();

// POST route to create a new project
router.post('/create-project', authenticate, createProject);

module.exports = router;