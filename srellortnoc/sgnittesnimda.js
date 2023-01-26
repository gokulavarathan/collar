const mongoose = require('mongoose');
const speakeasy = require('speakeasy');
const QRcode = require('qrcode');

const queryhelper = require('../srepleh/yreuq');
const common = require('../srepleh/nommoc');

exports.tfasetup = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('owner', { "_id": mongoose.Types.ObjectId(req.userId) }, {}, (getadmin) => {
            if (getadmin) {
                if (getadmin.status == 1) {
                    if (getadmin.tfastatus == 0) {
                        if (data.tfaenablekey != undefined && typeof data.tfaenablekey != 'undefined' && data.token != undefined && typeof data.token != 'undefined') {
                            let enable = speakeasy.totp.verify({
                                secret: data.tfaenablekey,
                                encoding: 'base32',
                                token: data.token
                            });
                            if (enable) {
                                let enckey = common.encrypt(data.tfaenablekey);
                                queryhelper.updateData('owner', 'one', { "_id": mongoose.Types.ObjectId(getadmin._id) }, { "tfastatus": 1, "tfasecret": enckey }, (tfaenable) => {
                                    if (tfaenable) {
                                        res.json({ "status": true, "message": "TFA enabled successfully" })
                                    } else {
                                        res.json({ "status": false, "message": "Error occurred in tfa enable. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Invalid tfa code" })
                            }
                        } else {
                            let secretname = getadmin.name + "@" + "Collarquest";
                            let secret = speakeasy.generateSecret({ "length": 20, "name": secretname });
                            secret.otpauth_url = secret.otpauth_url + "&issuer=Collarquest";
                            QRcode.toDataURL(secret.otpauth_url, (err, data_url) => {
                                secret.dataUrl = data_url;
                                res.json({ "status": true, "message": "success", "data": secret })
                            })
                        }
                    } else {
                        let deckey = common.decrypt(getadmin.tfasecret);
                        let disable = speakeasy.totp.verify({
                            secret: deckey,
                            encoding: 'base32',
                            token: data.token
                        });
                        if (disable) {
                            queryhelper.updateData('owner', 'one', { "_id": mongoose.Types.ObjectId(getadmin._id) }, { "tfastatus": 0, "tfasecret": "" }, (tfadisable) => {
                                if (tfadisable) {
                                    res.json({ "status": true, "message": "TFA disabled successfully" })
                                } else {
                                    res.json({ "status": false, "message": "Error occurred in tfa disable. Please try again later" })
                                }
                            })
                        } else {
                            res.json({ "status": false, "message": "Invalid tfa code" })
                        }
                    }
                } else {
                    res.json({ "status": false, "message": "Your account has been de-activated by admin" })
                }
            } else {
                res.json({ "status": false, "message": "Unauthorized person" })
            }
        })
    } catch (e) {
        console.log("Error catched in tfa setup", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.changePassword = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('owner', { "_id": mongoose.Types.ObjectId(req.userId) }, {}, (getadmin) => {
            if (getadmin) {
                if (getadmin.status == 1) {
                    if (data.newpassword == data.confirmpassword) {
                        let currentenc = common.encrypt(data.currentpassword);
                        if (currentenc == getadmin.password) {
                            if (data.newpassword !== data.currentpassword) {
                                let newenc = common.encrypt(data.newpassword);
                                queryhelper.updateData('owner', 'one', { "_id": mongoose.Types.ObjectId(getadmin._id) }, { "password": newenc }, (updated) => {
                                    if (updated) {
                                        res.json({ "status": true, "message": "Password changed successfully" })
                                    } else {
                                        res.json({ "status": false, "message": "Error in change password. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Current password and new password should not be the same" })
                            }
                        } else {
                            res.json({ "status": false, "message": "Invalid current password" })
                        }
                    } else {
                        res.json({ "status": false, "message": "Password and confirm password should be same" })
                    }
                } else {
                    res.json({ "status": false, "message": "Your account has been de-activated by admin" })
                }
            } else {
                res.json({ "status": false, "message": "Unauthorized person" })
            }
        })
    } catch (e) {
        console.log("Error catched in change password", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.changePattern = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('owner', { "_id": mongoose.Types.ObjectId(req.userId) }, {}, (getadmin) => {
            if (getadmin) {
                if (getadmin.status == 1) {
                    if (data.newpattern == data.confirmpattern) {
                        let currentenc = common.encrypt(data.currentpattern);
                        if (currentenc == getadmin.pattern) {
                            if (data.currentpattern != data.newpattern) {
                                let newenc = common.encrypt(data.newpattern);
                                queryhelper.updateData('owner', 'one', { "_id": mongoose.Types.ObjectId(getadmin._id) }, { "pattern": newenc }, (updated) => {
                                    if (updated) {
                                        res.json({ "status": true, "message": "Pattern changed successfully" })
                                    } else {
                                        res.json({ "status": false, "message": "Error in change pattern. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Current pattern and new pattern should not be the same" })
                            }
                        } else {
                            res.json({ "status": false, "message": "Invalid current pattern" })
                        }
                    } else {
                        res.json({ "status": false, "message": "Pattern and confirm pattern should be same" })
                    }
                } else {
                    res.json({ "status": false, "message": "Your account has been de-activated by admin" })
                }
            } else {
                res.json({ "status": false, "message": "Unauthorized person" })
            }
        })
    } catch (e) {
        console.log("Error catched in change pattern", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getProfile = (req, res) => {
    try {
        queryhelper.findoneData('owner', { "_id": mongoose.Types.ObjectId(req.userId) }, { "password": 0, "pattern": 0, "tfasecret": 0 }, (getadmin) => {
            if (getadmin) {
                let admindet = { ...getadmin }._doc;
                admindet.email = common.decrypt(getadmin.email);
                res.json({ "status": true, "message": "success", "data": admindet })
            } else {
                res.json({ "status": false, "message": "Unauthorized person" })
            }
        })
    } catch (e) {
        console.log("Error catched in get profile", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.updateProfile = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('owner', { "_id": mongoose.Types.ObjectId(req.userId) }, {}, (getadmin) => {
            if (getadmin) {
                queryhelper.updateData('owner', 'one', { "_id": mongoose.Types.ObjectId(getadmin._id) }, data, (updated) => {
                    if (updated) {
                        res.json({ "status": true, "message": "Profile updated successfully" })
                    } else {
                        res.json({ "status": false, "message": "Error in profile updation. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Unauthorized person" })
            }
        })
    } catch (e) {
        console.log("Error catched in update profile", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}