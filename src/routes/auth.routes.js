const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const authController = require('../controllers/auth.controller');

// User Log in
router.post(
    '/login',
    body('username').isEmail().withMessage('Username must be a valid email'),
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    },
    authController.login
);

module.exports = router;