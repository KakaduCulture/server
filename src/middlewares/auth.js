const jwt = require('jsonwebtoken');

// generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },     // Token payload
        process.env.JWT_SECRET,                        // Secret key from .env
        { expiresIn: '1h' }                     // Token expiration time
    );
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token required' });
    }

    try {
         // Decode and validate token
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    generateToken,
    verifyToken
};