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

