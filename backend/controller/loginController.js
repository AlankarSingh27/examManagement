
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const connection = require('../model/database');




exports.loginUser = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

       
        const user = await getAdminByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

     
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        if (user.role_id === 1) {
          

            res.json({ message: 'Admin login successful', role_id: 1 });
        } else if (user.role_id === 2) {
            res.json({ message: 'User login successful', role_id: 2 });
        } else {
            res.status(401).json({ error: 'Invalid role_id' });
        }
   

    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};


const getAdminByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [results] = await connection.promise().query(sql, [email]);
    return results[0];
};



