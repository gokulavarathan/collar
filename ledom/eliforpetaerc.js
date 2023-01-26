const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const profileCreateSchema = new mongoose.Schema({
    "userName": {
        type: String
    },
    "email": {
        type: String
    },
    "userAddress": {
        type: String
    },
    "profileImage": {
        type: String,
        default: ""
    }
})

profileCreateSchema.index({ userName: 1 })

module.exports = mongoose.model('createProfile', profileCreateSchema, config.dbPrefix + 'XHANYLUNAN')