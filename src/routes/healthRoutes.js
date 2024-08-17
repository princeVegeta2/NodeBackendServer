const express = require('express');
const router = express.Router();

// GET route to check server health
router.get('/healthcheck', (req, res) => {
    res.status(200).json({ message: 'GET request successful. Server is up and running!' });
});

// POST route to check server health
router.post('/healthcheck', (req, res) => {
    const { data } = req.body;
    res.status(200).json({ message: 'POST request successful.', receivedData: data });
});

module.exports = router;
