const mongoose = require('mongoose');

const timeSc = new mongoose.Schema({
    st_time: {
        type: String
    },
    en_time: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('MasterTime', timeSc);