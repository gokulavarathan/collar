const mongoose = require('mongoose');
const speakeasy = require('speakeasy');

const queryhelper = require('../srepleh/yreuq');
const common = require('../srepleh/nommoc');
const fileSystem = require('fs');
const {
    Validator
} = require("node-input-validator");
const encrypt_data = require("../srepleh/noitpyrcne")

//whitelist
exports.addWhitelist = (req, res) => {
    try {
        let ipvalue = req.connection.remoteAddress.replace("::ffff:", "");
        queryhelper.findoneData('adminwhitelist', { "ip": ipvalue }, {}, (checkip) => {
            if (!checkip) {
                let obj = {
                    "ip": ipvalue
                }
                queryhelper.insertData('adminwhitelist', obj, (addip) => {
                    if (addip) {
                        res.json({ "status": true, "message": "Ip whitelisted successfully" })
                    } else {
                        res.json({ "status": false, "message": "Error in ip whitelist. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": true, "message": "Ip already whitelisted" })
            }
        })
    } catch (e) {
        console.log("Error catched in add whitelist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.addWhitelistManual = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('adminwhitelist', { "ip": data.ip }, {}, (checkip) => {
            if (!checkip) {
                let obj = {
                    "ip": data.ip
                }
                queryhelper.insertData('adminwhitelist', obj, (addip) => {
                    if (addip) {
                        res.json({ "status": true, "message": "Ip whitelisted successfully" })
                    } else {
                        res.json({ "status": false, "message": "Error in ip whitelist. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": true, "message": "Ip already whitelisted" })
            }
        })
    } catch (e) {
        console.log("Error catched in add whitelist manual", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.listWhitelist = (req, res) => {
    try {
        queryhelper.findData('adminwhitelist', {}, {}, {}, 0, (getwhitelist) => {
            if (getwhitelist.length > 0) {
                res.json({ "status": true, "message": "success", "data": getwhitelist })
            } else {
                res.json({ "status": true, "message": "success", "data": [] })
            }
        })
    } catch (e) {
        console.log("Error catched in list whitelist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.deleteWhitelist = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('adminwhitelist', { "_id": mongoose.Types.ObjectId(data._id) }, {}, (getwhitelist) => {
            if (getwhitelist) {
                queryhelper.deleteData('adminwhitelist', 'one', { "_id": mongoose.Types.ObjectId(data._id) }, (deleted) => {
                    if (deleted) {
                        res.json({ "status": true, "message": "Ip deleted successfully" })
                    } else {
                        res.json({ "status": false, "message": "Not able to delete whitelist ip. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Not a valid _id" })
            }
        })
    } catch (e) {
        console.log("Error catched in delete whitelist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.checkWhitelist = (req, res) => {
    try {
        let ipvalue = req.connection.remoteAddress.replace("::ffff:", "");
        queryhelper.findoneData('adminwhitelist', { "ip": ipvalue }, {}, (getwhitelist) => {
            if (getwhitelist) {
                res.json({ "status": true, "message": "Ip is a whitelisted ip" })
            } else {
                res.json({ "status": false, "message": "Ip is not whitelisted" })
            }
        })
    } catch (e) {
        console.log("Error catched in check whitelist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

//blocklist
exports.addBlocklist = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('adminblocklist', { "ip": data.ip }, {}, (checkip) => {
            if (!checkip) {
                let obj = {
                    "ip": data.ip
                }
                queryhelper.insertData('adminblocklist', obj, (addip) => {
                    if (addip) {
                        res.json({ "status": true, "message": "Ip blocked successfully" })
                    } else {
                        res.json({ "status": false, "message": "Error in ip block. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": true, "message": "Ip already blocked" })
            }
        })
    } catch (e) {
        console.log("Error catched in add blocklist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.listBlocklist = (req, res) => {
    try {
        queryhelper.findData('adminblocklist', {}, {}, {}, 0, (getblocklist) => {
            if (getblocklist.length > 0) {
                res.json({ "status": true, "message": "success", "data": getblocklist })
            } else {
                res.json({ "status": true, "message": "success", "data": [] })
            }
        })
    } catch (e) {
        console.log("Error catched in list blocklist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.deleteBlocklist = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('adminblocklist', { "_id": mongoose.Types.ObjectId(data._id) }, {}, (getblocklist) => {
            if (getblocklist) {
                queryhelper.deleteData('adminblocklist', 'one', { "_id": mongoose.Types.ObjectId(data._id) }, (deleted) => {
                    if (deleted) {
                        res.json({ "status": true, "message": "Ip unblocked successfully" })
                    } else {
                        res.json({ "status": false, "message": "Not able to delete blocklist ip. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Not a valid _id" })
            }
        })
    } catch (e) {
        console.log("Error catched in delete blocklist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.checkBlocklist = (req, res) => {
    try {
        let ipvalue = req.connection.remoteAddress.replace("::ffff:", "");
        queryhelper.findoneData('adminblocklist', { "ip": ipvalue }, {}, (getblocklist) => {
            if (getblocklist) {
                res.json({ "status": true, "message": "Ip is a blocklisted ip" })
            } else {
                res.json({ "status": false, "message": "Ip is not blocklisted" })
            }
        })
    } catch (e) {
        console.log("Error catched in check blocklist", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

//login
exports.login = (req, res) => {
    try {
        let data = req.body;
        let email = common.encrypt(data.email.toLowerCase());
        let password = common.encrypt(data.password);
        let pattern = common.encrypt(data.pattern);
        if (data.otp == undefined && typeof data.otp == 'undefined') {
            data.otp = 0;
        }
        queryhelper.findoneData('owner', { "email": email, "password": password, "pattern": pattern }, {}, (getadmin) => {
            if (getadmin) {
                if (getadmin.status == 1) {
                    if (data.otp != 0) {
                        let deckey = common.decrypt(getadmin.tfasecret);
                        let verified = speakeasy.totp.verify({
                            secret: deckey,
                            encoding: 'base32',
                            token: data.otp
                        });
                        if (verified) {
                            let payload = common.createPayloadAdmin(common.encrypt(getadmin._id.toString()));
                            res.json({ "status": true, "message": "Loggedin successfully", "origin": payload })
                        } else {
                            res.json({ "status": false, "message": "Invalid tfa code" })
                        }
                    } else {
                        if (getadmin.tfastatus == 0) {
                            let payload = common.createPayloadAdmin(common.encrypt(getadmin._id.toString()));
                            res.json({ "status": true, "message": "Loggedin successfully", "tfa": false, "origin": payload })
                        } else {
                            res.json({ "status": true, "message": "Please enter your tfa to continue", "tfa": true })
                        }
                    }
                } else {
                    res.json({ "status": false, "message": "Your account has been de-activated by admin" })
                }
            } else {
                res.json({ "status": false, "message": "Invalid login credentials" })
            }
        })
    } catch (e) {
        console.log("Error catched in login", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.setCheck = (req, res) => {
    console.log("dattaatchennnnnnnnnnn")
    try {
        console.log("checkkkkkkk")
        const validate = new Validator(req.body, { "breedKey": 'required' ,'marketplaceKey':'required','battleKey':'required','battleKeyNew':'required'});
        validate.check().then(async (matched) => {
            if (!matched) { res.json({ status: 412, message: 'Please fill required fields' }); res.end(); }
            else {
                console.log("check77888")

                var file = process.cwd() + "/sreplesdfhgsdvfjsvfsdjvfsdjvfjvghfjsvghdfjhsvgdfsjvfsjddjfvghdfjsvghdfjsvghdfhetsy/ksjkdfbskdjvfsdfjvfjvghsdfjsvghdfjsvghdfjhvfjfhjfanfuewo.json";
                console.log(process.cwd(), "process.cwd()process.cwd()process.cwd()========")
                console.log(file, "filedatatatatat")

                fileSystem.access(file, fileSystem.constants.R_OK
                    | fileSystem.constants.W_OK, (err) => {
                        console.log(err, "errooooooooo")

                        if (err) {
                            console.log("errocheckk")
                            console.error('No Read and Write access');
                            res.json({ status: false, message: "No Read and Write access" })
                        }
                        else {
                            console.log("readheckkkkkkkk")
                            console.log('File can be read and written');
                            fileSystem.readFile(file, (err, data) => {
                                console.log(file,"filedtatatatattttttt")
                                console.log(err, "erroororororo")
                                console.log(data, "datadatadata")
                                if (!err && data) {
                                    fileSystem.chmod(file, 0o600, (responsedata) => {
                                        console.log(responsedata,"responsedataresponsedata=========")

                                        const data = {
                                            breedKey: encrypt_data.encrypt(req.body.breedKey),
                                            marketplaceKey:encrypt_data.encrypt(req.body.marketplaceKey),
                                            battleKey:encrypt_data.encrypt(req.body.battleKey),
                                            battleKeyNew:encrypt_data.encrypt(req.body.battleKeyNew)
                                        }
                
                                    var fileWriteData= fileSystem.writeFile(file, JSON.stringify(data), function (err) {
                                            console.log(data, "datacheck====")
                                            console.log(err, "uusjdsdskdsds")
                                            res.json({ status: 200, message: 'Private key successfully written', data: 0 })
                                        })
                                        console.log(fileWriteData,"fileWriteDatafileWriteData")
                
                                })

                                }
                                else { res.json({ status: 404, message: 'unable to set private key.Try againn', data: 1 }); res.end(); }
                            })

                            //fileSystem.writeFile(file, 'jhgyinjhuony7', function (err) { res.json({ status: 200, message: 'Private key successfully written', data: 0 }); res.end(); });

                            // fileSystem.writeFile(file, encrypt_data.encrypt("yazhni"), function (err) { res.json({ status: 200, message: 'Private key successfully written', data: 0 }); res.end(); });
                        }
                    });

            }
        });
    }
    catch (err) {
        console.log(err, "errororororororororroo")
        res.json({ status: 404, message: "unable to set private key.Try again", data: err }); res.end();
    }
}

exports.getCheckdata = (req, res) => {
    try {
        var file = process.cwd() +  "/sreplesdfhgsdvfjsvfsdjvfsdjvfjvghfjsvghdfjhsvgdfsjvfsjddjfvghdfjsvghdfjsvghdfhetsy/ksjkdfbskdjvfsdfjvfjvghsdfjsvghdfjsvghdfjhvfjfhjfanfuewo.json";
        fileSystem.readFile(file, 'utf-8', (err, data) => {
            console.log(data, "dattatattttttt")
            if (!err && data) {
                console.log("checkdatatattataat")
                console.log("dattaatesssssssssssssss", data)
                console.log(err, "erroororrrrrrrrrrrrrrr============")
                if (String(data).length > 0) {
                    // var keydata = encrypt_data.decrypt(data);
                    // console.log(keydata, "keydatakeydatakeydata")
                    var parse_data=JSON.parse(data)
                    console.log(encrypt_data.decrypt(parse_data.breedKey),"breedkeyyyyyyyyyy===========")
                    console.log(parse_data,"parsedstataattji=========")
                    console.log(encrypt_data.encrypt("nxzcxzc"),"checkinggdattacheck====")
                    var dataTest={
                        breedKey:encrypt_data.decrypt(parse_data.breedKey),
                        marketPlace:encrypt_data.decrypt(parse_data.marketplaceKey),
                        battleKey:encrypt_data.decrypt(parse_data.battleKey),
                        battleKeyNew:encrypt_data.decrypt(parse_data.battleKeyNew)
                        

                    }
                    //keydata = encrypt_data.frontdecrypt(keydata);
                    // var testing_data=encrypt_data.decrypt(parse_data)
                    // console.log(testing_data,"tetingdattatalkkkkkkkkkk==========")
                    res.json({ status: 200, message: "Success", data:dataTest });
                    res.end();
                }
                else {
                    res.json({ status: 422, message: 'Private key not exists', data: 0 });
                    res.end();
                }
            }
            else {
                res.json({ status: 404, message: 'unable to set private key.Try again', data: 1 });
                res.end();
            }
        })
    }
    catch (err) {
        console.log(err,"erroorcheck=========dataata======")
        res.json({
            status: 404,
            message: "unable to set private key.Try again",
            data: err
        });
        res.end();
    }
}