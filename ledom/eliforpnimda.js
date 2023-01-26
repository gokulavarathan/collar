const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const adminProfileSchema = new mongoose.Schema({
    "adminName": {
        type: String,
        default: ""
    },
    "adminProfileImage": {
        type: String,
        default: ""
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
})

adminProfileSchema.index({ userName: 1 })

module.exports = mongoose.model('adminProfile', adminProfileSchema, config.dbPrefix + 'GAQVDEQFPQ')