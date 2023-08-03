const mongoose = require('mongoose');

const availabilitySc = new mongoose.Schema({
    chamber: {
        type: String
    },
    time1: {
        type: String
    },
    days: {
        type: String
    },
    serial: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('MasterAvailability', availabilitySc)