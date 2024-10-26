const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Government = require('../models/governmentModel');

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId) || await Government.findById(decoded.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const isGovernment = (req, res, next) => {
    if (req.user instanceof Government) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied. Government access only.' });
};

module.exports = { authenticate, isGovernment };
