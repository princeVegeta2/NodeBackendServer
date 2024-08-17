// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Assuming you have a db connection file
const SECRET_KEY = process.env.SECRET_KEY;

// Signup logic
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, SECRET_KEY);

        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);

        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY);
        res.status(200).json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

