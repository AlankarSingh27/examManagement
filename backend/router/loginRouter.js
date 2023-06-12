
const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controller/loginController');

const loginRouter = express.Router();

// // Register admin
// loginRouter.post('/register',
//     [
//         body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Invalid email'),
//     body('role_id').notEmpty().withMessage('Role ID is required'),
//     body('mobile').notEmpty().withMessage('Mobile number is required'),
//     body('photo').notEmpty().withMessage('Photo is required'),
//     body('password').notEmpty().withMessage('Password is required'),
//     body('is_email_verify').notEmpty().withMessage('Email verification status is required'),
//     body('status').notEmpty().withMessage('Status is required'),
//     ],
//     adminController.registerUser
// );

// Admin login
loginRouter.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    adminController.loginUser
);

module.exports = loginRouter;






