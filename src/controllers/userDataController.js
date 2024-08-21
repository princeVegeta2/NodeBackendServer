// src/controllers/userDataController.js
const db = require('../db'); // Assuming you have a db connection file

exports.checkBuilderAccess = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await db.query('SELECT builder_access FROM users where id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hasAccess = result.rows[0].builder_access;
        res.status(200).json({ builder_access: hasAccess });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsername = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await db.query('SELECT username FROM users where id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found'});
        }

        const userName = result.rows[0].username;
        res.status(200).json({ username: userName });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmail = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await db.query('SELECT email FROM users where id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const fetchedEmail = result.rows[0].email;
        res.status(200).json({ email: fetchedEmail });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};