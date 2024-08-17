// src/middleware/authenticate.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId; // Attach the user ID to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;
