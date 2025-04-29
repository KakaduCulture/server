const express = require('express');
const router = express.Router();
const {body, validationResult, param} = require('express-validator');
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/auth');


// Get all users
router.get('/checkout/:userId',
    // verifyToken,
    orderController.getUnpaidOrder);


// Get all users
router.get('/paid/:userId',
    // verifyToken,
    orderController.getPaidOrder);
// module.exports = router;


// Create new unpaid order
router.post('/checkout/:userId',
    // verifyToken,
    orderController.createOrder);
module.exports = router;


// router.post(
//     '/',
//     body('name').notEmpty().withMessage('Name is required'),
//     body('username').isEmail().withMessage('Username must be a valid email address'),
//     body('username').notEmpty().withMessage('Username is required'),
//     body('password').notEmpty().withMessage('Password is required'),
//     body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({errors: errors.array()});
//         }
//         next();
//     },
//     userController.createUser
// );