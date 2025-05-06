const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const orderRoutes = require('./order.routes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/product',productRoutes);
router.use('/order',orderRoutes)
module.exports = router;

