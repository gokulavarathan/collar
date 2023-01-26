const mongoose = require('mongoose');
const config = require('../sliatededon/gifnoc');

const tokenSchema = new mongoose.Schema({
    "tokenName": {
        type: String,
        default: ""
    },
    "tokenNumber": {
        type: String,
        default: ""
    },
    "tokenId": {
        type: String,
        default: ""
    },
    "geneId": {
        type: String,
        default: ""
    },
    "file": {
        type: String,
        default: ""
    },
    "fileType": {
        type: String,
        default: ""
    },
    "ownerAddress": {
        type: String,
        default: ""
    },
    "breedCount": {
        type: Number,
        default: 0
    },
    "health": {
        type: Number,
        default: 0
    },
    "speed": {
        type: Number,
        default: 0
    },
    "skill": {
        type: Number,
        default: 0
    },
    "ability": {
        type: Number,
        default: 0
    },
    "abilityArr": {
        type: Array
    },
    "bodyParts": {
        type: Array
    },
    "isBreeded": {
        type: Boolean,
        default: false
    },
    "parentOneId": {
        type: String,
        default: ""
    },
    "parentTwoId": {
        type: String,
        default: ""
    },
    "parentOne": {
        type: Object,
        default: {}
    },
    "parentTwo": {
        type: Object,
        default: {}
    },
    "child": {
        type: Array,
        default: []
    },
    "createdAt": {
        type: Date,
    },
    "ownerChangedAt": {
        type: Date
    },
    "orderPlacerName": {
        type: String,
        default: ""
    },
    "status": {
        type: String,
        default: ""
    },
    "createdBy": {
        type: String,
        default: ""
    },
    "nftType":{
        type:String,
        default:""
    },
    "type": {
        type: String,
        default: ""
    },
    "weapon":{
        type: String,
        default: ""
    }
}, { versionKey: false });

tokenSchema.index({ tokenName: 1, tokenId: 1 })


module.exports = mongoose.model('token', tokenSchema, config.dbPrefix + "YSITFHZPLQ")