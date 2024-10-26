const mongoose = require('mongoose');

const unsafeAreaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    policy: { type: String, required: true },
});

module.exports = mongoose.model('UnsafeArea', unsafeAreaSchema);
