const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const orderSchema = new mongoose.Schema({
    "tokenId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'token'
    },
    "orderType": {
        type: String,
        default: ""
    },
    "orderPlacer": {
        type: String,
        default: ""
    },
    "price": {
        type: Number,
        default: 0
    },
    "datetime": {
        type: Date,
        default: Date.now
    },
    "orderPlacerName": {
        type: String,
        default: ""
    },
    "type":{
        type:String,
        default:""
    }
}, { versionKey: false });


orderSchema.index({ tokenId: 1 })

module.exports = mongoose.model('order', orderSchema, config.dbPrefix + "TQYHURDKZW");