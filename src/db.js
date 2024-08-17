const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, 
    ssl: {
        rejectUnauthorized: false, // This allows self-signed certificates
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
