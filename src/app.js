// src/app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Import the authRoutes module
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
// Ports
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
