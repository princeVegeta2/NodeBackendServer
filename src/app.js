// src/app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const healthRoutes = require('./routes/healthRoutes');
const userDataRoutes = require('./routes/userDataRoutes');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
// Ports
const PORT = process.env.PORT || 3000;

// Enabling cors
app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userDataRoutes);
app.use('/api/health', healthRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
