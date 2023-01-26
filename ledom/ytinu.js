const mongoose = require("mongoose");

const config = require("../sliatededon/gifnoc");

const unitySchema = new mongoose.Schema({
    "playList": {
        type: Array,
        
    },"roomNumber":{
        type:Number,
        default:0
    },"status":{
        type:String,       
    },"firstPlayerData":{
        type:Array
    },"secondPlayerData":{
        type:Array
    },
    "createdAt": {
        type: Date,
        default: Date.now
    }
},{ versionKey: false })
unitySchema.index({ roomNumber: 1 })

module.exports = mongoose.model("unitySchema", unitySchema, config.dbPrefix + "AHVQHHFMWTYTINU")
