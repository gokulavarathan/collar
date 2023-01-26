const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const scholarShipSchema = new mongoose.Schema({

    "userName": {
        type: String,
        default: ""
    },
    "telegram": {
        type: String,
        default: ""
    },
    "email": {
        type: String,
        default: ""
    },
    "country": {
        type: String,
        default: ""
    },
    "age": {
        type: String,
        default: ""
    },
    "nativeLanguage": {
        type: String,
        default: ""
    },
    "languageLevel": {
        type: String,
        default: ""
    },
    "gender": {
        type: String,
        default: ""
    },
    "comments": {
        type: String,
        default: ""
    }
})

scholarShipSchema.index({ userName: 1 })

module.exports = mongoose.model('scholarship', scholarShipSchema, config.dbPrefix + 'NANULYNAHX')