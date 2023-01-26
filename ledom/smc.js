const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const cmsSchema = new mongoose.Schema({
    "pageTitle": {
        type: String,
        default: ""
    },
    "pageContent": {
        type: String,
        default: ""
    },
    "pageKey": {
        type: String,
        default: ""
    },
    "image": {
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
    },
    "modifiedDate": {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })

cmsSchema.index({ pageTitle: 1, pageKey: 1 })

module.exports = mongoose.model('cms', cmsSchema, config.dbPrefix + "NBPLRHDTFW")