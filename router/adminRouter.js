//
//
// const express = require('express');
// const userRouter = express.Router();
// const { body } = require('express-validator');
// const AdminController = require('../controller/adminController');
//
//
// userRouter.post('/register', [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Invalid email'),
//     body('role_id').notEmpty().withMessage('Role ID is required'),
//     body('mobile').notEmpty().withMessage('Mobile number is required'),
//     body('photo').notEmpty().withMessage('Photo is required'),
//     body('password').notEmpty().withMessage('Password is required'),
//     body('is_email_verify').notEmpty().withMessage('Email verification status is required'),
//     body('status').notEmpty().withMessage('Status is required'),
// ], async (request, response) => {
//     await AdminController.registerUser(request, response);
// });
//
//
// userRouter.post("/login", [
//    body('email').isEmail().withMessage("Proper Email is Required"),
//     body('password').isStrongPassword().withMessage("Strong Password is Required")
// ], async (request, response) => {
//     await AdminController.loginUser(request, response);
// });
const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controller/adminController');

const adminRouter = express.Router();

// Register admin
adminRouter.post('/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('role_id').notEmpty().withMessage('Role ID is required'),
    body('mobile').notEmpty().withMessage('Mobile number is required'),
    body('photo').notEmpty().withMessage('Photo is required'),
    body('password').notEmpty().withMessage('Password is required'),
    body('is_email_verify').notEmpty().withMessage('Email verification status is required'),
    body('status').notEmpty().withMessage('Status is required'),
    ],
    adminController.registerAdmin
);

// Admin login
adminRouter.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    adminController.loginAdmin
);

module.exports = adminRouter;






