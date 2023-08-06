const mongoose = require('mongoose');

const doctorSc = new mongoose.Schema({
    name: {
        type: String,
    },
    specialist: {
        type: String,
    },
    designation: {
        type: String,
    },
    degree: {
        type: String,
    },
    experience: {
        type: String,
    }
})

module.exports = mongoose.model("MasterDoctor", doctorSc);