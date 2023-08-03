const mongoose = require('mongoose');

const chamberSc = new mongoose.Schema({
    chamber: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('MasterChamber', chamberSc);