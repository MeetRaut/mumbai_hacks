const User = require('../models/userModel');
const Government = require('../models/governmentModel');

// Report Unsafe Area
exports.reportUnsafeArea = async (req, res) => {
    const { area,description } = req.body;
    try {
        const userId = req.user._id;

        // Create report and save it to the user
        const report = { area,description };
        await User.findByIdAndUpdate(userId, { $push: { unsafeReports: report } });

        // Notify government by adding to their unsafe areas
        await Government.updateMany({}, { $addToSet: { unsafeAreas: report } });

        res.status(201).json({ message: "Unsafe area reported successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
