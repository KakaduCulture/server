const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/auth');

// Get all products
router.get('/', productController.getAllProducts);

// Create a new product
router.post(
    '/',
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').notEmpty().withMessage('Stock is required'),
    body('unit').notEmpty().withMessage('Unit is required'),
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
    body('description').notEmpty().withMessage('Description is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    productController.createProducts
);

// Delete product by ID
router.delete(
    '/:productId',
    verifyToken,
    param('productId').isInt().withMessage('Product ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    productController.deleteProducts
);

router.delete('/', (req, res) => {
    res.status(400).json({
        error: 'Product ID is required in the path, e.g., /products/1'
    });
});

// Update product by ID
router.put(
    '/:productId',
    verifyToken,
    param('productId').isInt().withMessage('Product ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    productController.updateProducts
);

router.put('/', (req, res) => {
    res.status(400).json({
        error: 'Product ID is required in the path, e.g., /products/1'
    });
});

module.exports = router;
