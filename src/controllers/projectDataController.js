// src/controllers/userDataController.js
const db = require('../db');

exports.createProject = async (req, res) => {
    try {
        const { userId } = req; // Assuming authenticate middleware attaches userId to req
        const { projectName } = req.body;

        // Validate projectName
        if (!projectName || projectName.trim() === "") {
            return res.status(400).json({ error: "Project name cannot be empty." });
        }

        if (projectName.length > 255) {
            return res.status(400).json({ error: "Project name cannot exceed 255 characters." });
        }

        // Insert new project into the projects table
        const result = await db.query(
            'INSERT INTO projects (user_id, name, created_at) VALUES ($1, $2, NOW()) RETURNING id, name, user_id, created_at',
            [userId, projectName]
        );

        const newProject = result.rows[0];

        res.status(201).json({ project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project: ' + error.message });
    }
};