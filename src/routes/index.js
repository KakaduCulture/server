const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/product',productRoutes)

module.exports = router;