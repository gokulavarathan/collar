const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const ownerSchema = new mongoose.Schema({
    "name": {
        type: String,
        default: ""
    },
    "email": {
        type: String,
        default: ""
    },
    "password": {
        type: String,
        default: ""
    },
    "pattern": {
        type: String,
        default: ""
    },
    "status": {
        type: Number,
        default: 1
    },
    "tfastatus": {
        type: Number,
        default: 0
    },
    "tfasecret": {
        type: String,
        default: ""
    },
    "datetime": {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

ownerSchema.index({ name: 1 })

module.exports = mongoose.model('owner', ownerSchema, config.dbPrefix + 'ZYHHSEUBBS')