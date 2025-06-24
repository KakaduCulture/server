const express = require('express');
const router = express.Router();
const { body,validationResult, param } = require('express-validator');
const cartController = require('../controllers/cart.controller');
const { verifyToken } = require('../middlewares/auth');

// Get cart by user id
router.get('/:user_id', cartController.getCartByUserId);

// Create a new cart
router.post(
    '/',
    body('user_id').notEmpty().withMessage('user_id is required'),
    body('product_id').isNumeric().withMessage('product_id must be a number'),
    body('name_product').notEmpty().withMessage('name_product is required'),
    body('price').notEmpty().withMessage('price is required'),
    body('imageUrl').notEmpty().withMessage('Image URL is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    cartController.createCart
);

// Delete product by ID
// router.delete(
//     '/:cartId',
//     verifyToken,
//     param('cartId').isInt().withMessage('Product ID must be an integer'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     },
//     cartController.deleteCarts
// );

router.delete(
  '/:userId',
//   verifyToken,
  param('userId').isInt().withMessage('User ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  cartController.deleteCartByUserId
);

module.exports = router;
