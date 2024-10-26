const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const generateToken = require('../utils/jwt');

// User Registration
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.json({ token, user: { name: user.name, email: user.email, isGovernment: user.isGovernment } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
