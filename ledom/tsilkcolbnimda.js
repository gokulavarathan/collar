const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const blocklistSchema = new mongoose.Schema({
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

blocklistSchema.index({ ip: 1 })


module.exports = mongoose.model('adminblocklist', blocklistSchema, config.dbPrefix + 'HRHRNBHFAZ')