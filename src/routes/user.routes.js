const express = require('express');
const router = express.Router();
const {body, validationResult, param} = require('express-validator');
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
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
router.delete(
    '/:userId',
    param('userId')
        .notEmpty().withMessage('User ID is required')
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

router.put(
    '/:userId',
    param('userId')
        .notEmpty().withMessage('User ID is required')
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

module.exports = router;