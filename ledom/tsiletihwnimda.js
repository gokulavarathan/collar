const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const whitelistSchema = new mongoose.Schema({
    "ip": {
        type: String,
        default: ""
    },
    "status": {
        type: Number,
        default: 1
    },
    "datetime": {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

whitelistSchema.index({ ip: 1 })

module.exports = mongoose.model('adminwhitelist', whitelistSchema, config.dbPrefix + 'ZALTQQPDLY')