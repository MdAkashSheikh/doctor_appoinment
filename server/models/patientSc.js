const mongoose = require('mongoose');

const patientSc = new mongoose.Schema({
    chamber: {
        type: String,
    },
    specialist: {
        type: String,
    },
    doctor: {
        type: String,
    },
    date1: {
        type: Date,
    },
    time1: {
        type: String,
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
    phone: {
        type: Number
    },
    details: {
        type: String
    },
    serial: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('PatientData', patientSc);