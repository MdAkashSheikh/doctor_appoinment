const mongoose = require('mongoose');

const patientSc = new mongoose.Schema({
    chamber: {
        type: String,
    },
    specialist: {
        type: String,
    },
    dr_name: {
        type: String,
    },
    s_date: {
        type: Date,
    },
    s_time: {
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