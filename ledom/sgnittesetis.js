const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const siteSchema = new mongoose.Schema({
    "siteName": {
        type: String,
        default: ""
    },
    "siteLogo": {
        type: String,
        default: ""
    },
    "siteMaintainence": {
        type: Number,
        default: 0
    },
    "copyright": {
        type: String,
        default: ""
    },
    "facebookUrl": {
        type: String,
        default: ""
    },
    "twitterUrl": {
        type: String,
        default: ""
    },
    "discordUrl": {
        type: String,
        default: ""
    },
    "telegramUrl": {
        type: String,
        default: ""
    },
    "mediumUrl": {
        type: String,
        default: ""
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

siteSchema.index({ siteMaintainence: 1 })
module.exports = mongoose.model('sitesettings', siteSchema, config.dbPrefix + "RVSYDZBCSZ")