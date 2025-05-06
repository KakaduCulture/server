const express = require('express');
const router = express.Router();
const {body, validationResult, param} = require('express-validator');
const orderController = require('../controllers/order.controller');
const { verifyToken } = require('../middlewares/auth');


//Get order waiting to pay by user ID
router.get('/checkout/:userId',
    // verifyToken,
    orderController.getUnpaidOrder);

//Get all paid order by user ID
router.get('/paid/:userId',
    // verifyToken,
    orderController.getPaidOrder);

// Create new unpaid order
router.post('/checkout/:userId',
    // verifyToken,
    orderController.createUnpaidOrder);

router.delete('/checkout/:userId',
        // verifyToken,
        orderController.deleteUnpaidOrder);

router.put('/checkout/:userId',
    // verifyToken,

    orderController.modifyOrderInformation);

// Add more product
router.post('/checkout/:userId/product/:productId',
        // verifyToken,
        
     orderController.addProduct);

// Remove product
router.delete('/checkout/:userId/product/:productId',
    // verifyToken,  
 orderController.removeProduct);

router.put('/payment/:userId',
        // verifyToken,
        
     orderController.payment);

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