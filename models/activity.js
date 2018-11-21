const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    name: String,
    address: String,
    type: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);