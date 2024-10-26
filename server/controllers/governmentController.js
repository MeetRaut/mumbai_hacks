const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Make sure this import is present
const Government = require('../models/governmentModel');
const generateToken = require('../utils/jwt');

// Government Registration
exports.registerGovernment = async (req, res) => {
    const { name, email, password, governmentIdNo } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newGov = new Government({ name, email, password: hashedPassword, governmentIdNo });
        await newGov.save();
        res.status(201).json({ message: 'Government official registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Government Login
exports.loginGovernment = async (req, res) => {
    const { email, password } = req.body;
    try {
        const government = await Government.findOne({ email });
        if (!government) return res.status(401).json({ message: 'Invalid credentials' });

        const isPasswordValid = await bcrypt.compare(password, government.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken(government._id);
        res.json({ token, government: { name: government.name, email: government.email, isGovernment: true } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.postNewPolicy = async (req, res) => {
    const { policy } = req.body;
    try {
        await Government.findByIdAndUpdate(req.user._id, { $push: { policies: { policy } } });
        res.json({ message: "Policy posted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Policies for Users
exports.getAllPolicies = async (req, res) => {
    try {
        const governmentData = await Government.find();
        const policies = governmentData.flatMap(gov => gov.policies);
        res.json({ policies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Unsafe Reports
exports.getUserReports = async (req, res) => {
    try {
        // Fetch user reports (Assuming you are storing reports in user documents)
        const users = await User.find({}).populate('unsafeReports');
        
        // If you need to process reports, you can do it here
        const reports = users.map(user => ({
            userId: user._id,
            email: user.email,
            reports: user.unsafeReports
        }));

        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};