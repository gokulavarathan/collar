const mongoose = require('mongoose');
const async = require('async');

const queryhelper = require('../srepleh/yreuq');
const common = require('../srepleh/nommoc');

const whitelist = mongoose.model("whitelist")

exports.addwhitelist = (req, res) => {
     try {

          queryhelper.findoneData('whitelist', { "whitelistIP": req.body.ip }, {}, (listIp) => {
               if (listIp) {
                    res.json({ status: false, message: "Already Exists" });
               }
               else {
                    let whiteData = {
                         whitelistIP: req.body.ip,
                         createdAt: new Date(),
                         whitelistedBy: req.body.whitelistedBy
                    }

                    queryhelper.insertData('whitelist', whiteData, (nftcreated) => {
                         if (nftcreated) {
                              res.json({ status: true, message: "Added Successfully" });

                         } else {
                              res.json({ "status": false, "message": "Error occurred in ip adding. Please try again later" })
                         }
                    })
               }
          })
     }
     catch (e) {
          console.log("Error in adding whitelist", e);
          res.json({ status: false, message: "Error in Adding whitelist" })
     }
}


exports.findWhiteList = (req, res) => {
     queryhelper.findData('whitelist', {}, {}, {}, 0, (listIp) => {

          if (listIp) {
               res.json({ status: true, message: "Whitelist", data: listIp });
          }
          else {
               res.json({ status: false, message: "List Not found" });
          }
     })
}


exports.removeWhiteList = (req, res) => {
     queryhelper.deleteData('whitelist', 'one', { whitelistIP: req.body.ip }, (removed) => {
          if (removed) {
               res.json({ status: true, message: "Removed Successfully" });
               res.end()
          }
          else {
               res.json({ status: false, message: "Unable to Remove" });
               res.end()
          }
     })
}