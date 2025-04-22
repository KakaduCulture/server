const express = require('express');
const router = express.Router();
const {body, validationResult, param} = require('express-validator');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth');

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post(
    '/',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
    userController.createUser
);

// Delete user by ID
router.delete(
    '/:userId',
    verifyToken, // Middleware to verify JWT token
    param('userId')
        .isInt().withMessage('User ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
    userController.deleteUser
);
router.delete('/', (req, res) => {
    res.status(400).json({
        error: 'User ID is required in the path, e.g., /users/1'
    });
});

// Update user by ID
router.put(
    '/:userId',
    param('userId')
        .isInt().withMessage('User ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
    userController.updateUser
);
router.put('/', (req, res) => {
    res.status(400).json({
        error: 'User ID is required in the path, e.g., /users/1'
    });
});

module.exports = router;