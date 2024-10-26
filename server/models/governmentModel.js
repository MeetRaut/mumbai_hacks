const mongoose = require('mongoose');

const governmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    governmentIdNo: { type: String, required: true },
    unsafeAreas: [{ area: String }],
    policies: [{ policy: String }]
});

module.exports = mongoose.model('Government', governmentSchema);
