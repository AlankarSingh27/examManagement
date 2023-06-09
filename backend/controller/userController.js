const connection = require('../model/database');
const bcrypt = require('bcrypt');

const UserController = {};


UserController.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const results = await connection.promise().query(sql);
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};


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


UserController.createUser = async (req, res) => {
    try {
        const { name, email, role_id, mobile, photo, password } = req.body;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql =
            'INSERT INTO users (name, email, role_id, mobile, photo, password) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.promise().query(sql, [name, email, role_id, mobile, photo, hashedPassword]);

        res.json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};


UserController.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, role_id, mobile, photo, password } = req.body;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sql =
            'UPDATE users SET name = ?, email = ?, role_id = ?, mobile = ?, photo = ?, password = ? WHERE id = ?';
        await connection.promise().query(sql, [name, email, role_id, mobile, photo, hashedPassword, id]);

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};


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
