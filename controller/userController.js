// controllers/userController.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alankar12@',
    database: 'examManagement'
});

connection.connect();

const UserController = {};

// GET /users
UserController.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const results = await connection.promise().query(sql);
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

// GET /users/:id
UserController.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'SELECT * FROM users WHERE id = ?';
        const results = await connection.promise().query(sql, [id]);

        if (results[0].length > 0) {
            res.json(results[0][0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

 // POST /users
UserController.createUser = async (req, res) => {
    try {
        const { name, email, role_id, mobile, photo, password } = req.body;
        const sql =
            'INSERT INTO users (name, email, role_id, mobile, photo, password) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.promise().query(sql, [name, email, role_id, mobile, photo, password]);

        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// PUT /users/:id
UserController.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, role_id, mobile, photo, password } = req.body;
        const sql =
            'UPDATE users SET name = ?, email = ?, role_id = ?, mobile = ?, photo = ?, password = ? WHERE id = ?';
        await connection.promise().query(sql, [name, email, role_id, mobile, photo, password, id]);

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// DELETE /users/:id
UserController.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM users WHERE id = ?';
        await connection.promise().query(sql, [id]);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = UserController;
