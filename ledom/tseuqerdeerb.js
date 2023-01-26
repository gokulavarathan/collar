const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const breedRequestSchema = new mongoose.Schema({
    "userAddress": {
        type: String,
        default: ""
    },
    "parentOneId": {
        type: String,
        default: ""
    },
    "parentTwoId": {
        type: String,
        default: ""
    },
    "eggId": {
        type: String,
        default: ""
    },
    "status": {
        type: Number,
        default: 0
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
}, { versionKey: false })


breedRequestSchema.index({ userAddress: 1 })
module.exports = mongoose.model('breedrequest', breedRequestSchema, config.dbPrefix + "CNUJVOLJRH")