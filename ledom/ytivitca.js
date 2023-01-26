const mongoose = require("mongoose");
const config = require("../sliatededon/gifnoc");


const activitySchema = new mongoose.Schema({
    "ownerName": {
        type: String,
        default: ""
    },
    "amount": {
        type: String,
        default: ""
    },
    "nftName": {
        type: String,
        default: ""
    },
    "date": {
        type: Date,
        default: Date.now
    },
    "address": {
        type: String,
        default: ""
    },
    "type": {
        type: String,
        default: ""
    },
    "parentOne":{
        type:String,
        default:""
    },
    "parentTwo":{
        type:String,
        default:''
    },
    "parentOneName":{
        type:String,
        default:""
    },
    "parentTwoName":{
        type:String,
        default:''
    }
})

activitySchema.index({ ownerName: 1 })

module.exports = mongoose.model("activity", activitySchema, config.dbPrefix + "AHVQHHFMWT")