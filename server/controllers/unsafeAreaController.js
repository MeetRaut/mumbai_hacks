const UnsafeArea = require('../models/unsafeAreaModel');

// Create an Unsafe Area
exports.createUnsafeArea = async (req, res) => {
    const { name, description, policy } = req.body;
    try {
        const newUnsafeArea = new UnsafeArea({ name, description, policy });
        await newUnsafeArea.save();
        res.status(201).json({ message: 'Unsafe area created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Unsafe Areas
exports.getUnsafeAreas = async (req, res) => {
    try {
        const unsafeAreas = await UnsafeArea.find();
        res.status(200).json(unsafeAreas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Unsafe Area by ID
exports.getUnsafeAreaById = async (req, res) => {
    const { id } = req.params;
    try {
        const unsafeArea = await UnsafeArea.findById(id);
        if (!unsafeArea) return res.status(404).json({ message: 'Unsafe area not found' });
        res.status(200).json(unsafeArea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Unsafe Area
exports.updateUnsafeArea = async (req, res) => {
    const { id } = req.params;
    const { name, description, policy } = req.body;
    try {
        const updatedArea = await UnsafeArea.findByIdAndUpdate(id, { name, description, policy }, { new: true });
        if (!updatedArea) return res.status(404).json({ message: 'Unsafe area not found' });
        res.status(200).json(updatedArea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Unsafe Area
exports.deleteUnsafeArea = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArea = await UnsafeArea.findByIdAndDelete(id);
        if (!deletedArea) return res.status(404).json({ message: 'Unsafe area not found' });
        res.status(200).json({ message: 'Unsafe area deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
