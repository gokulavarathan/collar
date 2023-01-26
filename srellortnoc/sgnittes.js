const mongoose = require('mongoose');

const queryhelper = require('../srepleh/yreuq');

exports.createSiteDetails = (req, res) => {
    try {
        let data = req.body;
        queryhelper.insertData('sitesettings', data, (addsitesettings) => {
            if (addsitesettings) {
                res.json({ status: true, message: "site settings created", "data": addsitesettings })
            }
            else {
                res.json({ status: false, message: "unable to create site settings", "data": [] })

            }
        })
    } catch (e) {
        console.log("Error catched in create site details", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }

}

exports.getSiteDetails = (req, res) => {
    try {
        queryhelper.findoneData('sitesettings', {}, {}, (getsitedata) => {
            if (getsitedata) {
                res.json({ "status": true, "message": "success", "data": getsitedata })
            } else {
                res.json({ "status": true, "message": "success", "data": {} })
            }
        })
    } catch (e) {
        console.log("Error catched in get site details", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updateSiteDetails = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('sitesettings', { "_id": mongoose.Types.ObjectId(data._id) }, {}, (getsitedata) => {
            if (getsitedata) {
                data.modifiedDate = new Date();
                queryhelper.updateData('sitesettings', 'one', { "_id": mongoose.Types.ObjectId(data._id) }, data, (updated) => {
                    if (updated) {
                        res.json({ "status": true, "message": "Site settings updated successfully" })
                    } else {
                        res.json({ "status": false, "message": "Error occured in site settings updation. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Invalid id" })
            }
        })
    } catch (e) {
        console.log("Error catched in upate site details", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getcms = (req, res) => {
    try {
        queryhelper.findData('cms', {}, {}, { "createdDate": -1 }, 0, (getlist) => {
            if (getlist.length > 0) {
                res.json({ "status": true, "message": "success", "data": getlist })
            } else {
                res.json({ "status": true, "message": "success", "data": [] })
            }
        })
    } catch (e) {
        console.log("Error catched in get cms", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.singlecms = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('cms', { "_id": mongoose.Types.ObjectId(data._id) }, {}, (getcms) => {
            if (getcms) {
                res.json({ "status": true, "message": "success", "data": getcms })
            } else {
                res.json({ "status": true, "message": "success", "data": {} })
            }
        })
    } catch (e) {
        console.log("Error catched in single cms", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.editcms = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('cms', { "_id": mongoose.Types.ObjectId(data._id) }, {}, (getcms) => {
            if (getcms) {
                data.modifiedDate = new Date();
                queryhelper.updateData('cms', 'one', { "_id": mongoose.Types.ObjectId(getcms._id) }, data, (updated) => {
                    if (updated) {
                        res.json({ "status": true, "message": "CMS updated successfully" })
                    } else {
                        res.json({ "status": false, "message": "Error occurred in cms updation. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Invalid id" })
            }
        })
    } catch (e) {
        console.log("Error catched in edit cms", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}