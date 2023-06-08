
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const connection = require('../model/database');

// Register admin
exports.registerAdmin = async (req, res) => {
    try {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, role_id, mobile, photo, password, is_email_verify, status  } = req.body;

        // Check if admin with the same email already exists
        const existingAdmin = await getAdminByEmail(email);
        if (existingAdmin) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert admin into the database
        const sql = 'INSERT INTO users (name, email, role_id, mobile, photo, password, is_email_verify, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                     await connection.promise().query(sql, [name, email, role_id, mobile, photo, hashedPassword, is_email_verify, status]);


        res.status(201).json({ message: 'users registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    try {
        // Validate user input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if admin with the provided email exists
        const admin = await getAdminByEmail(email);
        if (!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Admin login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};

// Helper function to get admin by email
const getAdminByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [results] = await connection.promise().query(sql, [email]);
    return results[0];
};



