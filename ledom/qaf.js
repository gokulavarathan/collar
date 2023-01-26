const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const faqSchema = new mongoose.Schema({
    "type": {
        type: String,
        default: ""
    },
    "question": {
        type: String,
        default: ""
    },
    "answer": {
        type: String,
        default: ""
    },
    "status": {
        type: Number,
        default: 0
    },
    "createdDate": {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

faqSchema.index({ type: 1 })

module.exports = mongoose.model('faq', faqSchema, config.dbPrefix + "ORBGRKNCKD")