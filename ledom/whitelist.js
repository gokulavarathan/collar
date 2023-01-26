const mongoose = require("mongoose");

const config = require("../sliatededon/gifnoc");


const whiteListSchema = new mongoose.Schema({
     "whitelistIP": {
          type: String,
          default: ""
     },
     "createdAt": {
          type: Date,
          default: Date.now
     },
     "whitelistedBy":{
          type:String,
          default:""
     }
})


module.exports = mongoose.model("whitelist", whiteListSchema, config.dbPrefix + "IVJGNRBYTX")