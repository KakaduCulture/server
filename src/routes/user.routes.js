const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.post(
    '/',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be a valid email address'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    userController.createUser
);

module.exports = router;