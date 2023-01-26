const mongoose = require('mongoose');
const async = require('async');

const queryhelper = require('../srepleh/yreuq');
const common = require('../srepleh/nommoc');

const order = mongoose.model('order');
const token = mongoose.model('token');

exports.createToken = (req, res) => {
    try {
        var data = req.body;
        console.log(req.body,"body")
        console.log(req.file,"file")

        console.log("ABC",typeof(JSON.stringify(req.body.tokenId)))

        if (req.body.mintType == "singlemint") {
            if (data.isBreeded == "false") {

                common.imageUpload(req.file, (uploadresult) => {
                    console.log(uploadresult,"uploadresult")

                    if (uploadresult.status) {

                        let urlsplit = uploadresult.url.split('.');
                        let filetype = urlsplit[(urlsplit.length) - 1];
                        let ftype;
                        if (filetype == "mp4") {
                            ftype = "video";
                        } else {
                            ftype = "image";
                        }

                        let tokeninput = {
                            "tokenName": data.tokenName,
                            "tokenNumber": data.tokenNumber,
                            "tokenId": data.tokenId,
                            "geneId": data.geneId,
                            "ownerAddress": data.ownerAddress,
                            "breedCount": data.breedCount,
                            "file": uploadresult.url,
                            "fileType": ftype,
                            "health": data.health,
                            "speed": data.speed,
                            "skill": data.skill,
                            "ability": data.ability,
                            "abilityArr": JSON.parse(data.abilityArr),
                            "bodyParts": JSON.parse(data.bodyParts),
                            "isBreeded": data.isBreeded,
                            "createdDate": new Date(),
                            "orderPlacerName": data.orderPlacerName,
                            "status": data.status,
                            "createdBy": data.createdBy,
                            "type": req.body.type,
                            "nftType": req.body.nftType,
                            "weapon": req.body.weapon
                        }
                        queryhelper.insertData('token', tokeninput, (nftcreated) => {
                            if (nftcreated) {
                                let orderinput = {
                                    "tokenId": nftcreated._id,
                                    "price": data.price,
                                    "orderPlacer": data.orderPlacer,
                                    "orderType": data.orderType,
                                    "orderPlacerName": data.orderPlacerName
                                }
                                queryhelper.insertData('order', orderinput, (ordercreated) => {
                                    if (ordercreated) {
                                        res.json({ "status": true, "message": "NFT Created successfully" })
                                    } else {
                                        res.json({ "status": false, "message": "Error occurred in nft order creation. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                            }
                        })
                    } else {
                        res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                    }
                })
            } else {
                console.log("comming breed condition")
                queryhelper.findoneData('token', { "tokenId": data.parentOneId }, {}, (getparent1) => {
                    console.log(getparent1,"getparent1")
                    if (getparent1) {
                        queryhelper.findoneData('token', { "tokenId": data.parentTwoId }, {}, (getparent2) => {
                            if (getparent2) {
                                if (parseInt(getparent1.breedCount) <= 6) {
                                    if (parseInt(getparent2.breedCount) <= 6) {
                                        common.imageUpload(req.file, (uploadresult) => {
                                            console.log("image uploaded",uploadresult)
                                            if (uploadresult.status) {
                                                let urlsplit = uploadresult.url.split('.');
                                                let filetype = urlsplit[(urlsplit.length) - 1];
                                                let ftype;
                                                if (filetype == "mp4") {
                                                    ftype = "video";
                                                } else {
                                                    ftype = "image";
                                                }
                                                data.abilityArr = JSON.parse(data.abilityArr);
                                                data.bodyParts = JSON.parse(data.bodyParts);
                                                data.parentOne = getparent1;
                                                data.parentTwo = getparent2;
                                                data.createdDate = new Date();
                                                data.file = uploadresult.url;
                                                data.fileType = ftype;

                                                queryhelper.insertData('token', data, (nftcreated) => {
                                                    if (nftcreated) {
                                                        let nftchild = { ...nftcreated }._doc;
                                                        let parent1breed = parseInt(getparent1.breedCount);
                                                        parent1breed = parent1breed + 1;
                                                        token.updateOne({ "_id": mongoose.Types.ObjectId(getparent1._id) }, { "$push": { "child": nftchild }, "$set": { "breedCount": parent1breed } }, (err, p1update) => {
                                                            if (!err && p1update) {
                                                                let parent2breed = parseInt(getparent2.breedCount);
                                                                parent2breed = parent2breed + 1;
                                                                token.updateOne({ "_id": mongoose.Types.ObjectId(getparent2._id) }, { "$push": { "child": nftchild }, "$set": { "breedCount": parent2breed } }, (err, p2update) => {
                                                                    if (!err && p2update) {
                                                                        res.json({ "status": true, "message": "Nft created successfully" })
                                                                    } else {
                                                                        res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                                                    }
                                                                })
                                                            } else {
                                                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                                            }
                                                        })
                                                    } else {
                                                        res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                                    }
                                                })
                                            } else {
                                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                            }
                                        })
                                    } else {
                                        res.json({ "status": false, "message": "Parent two breed count has been reached. Unable to breed using parent two" })
                                    }
                                } else {
                                    res.json({ "status": false, "message": "Parent one breed count has been reached. Unable to breed using parent one" })
                                }
                            } else {
                                res.json({ "status": false, "message": "Invalid parent Id" })
                            }
                        })
                    } else {
                        res.json({ "status": false, "message": "Invalid parent Id" })
                    }
                })
            }
        }
        else {
            //multimint
            //split array as obj and then save into db
            common.imageUpload(req.file, (uploadresult) => {
                if (uploadresult.status) {
                    let urlsplit = uploadresult.url.split('.');
                    let filetype = urlsplit[(urlsplit.length) - 1];
                    let ftype;
                    if (filetype == "mp4") {
                        ftype = "video";
                    } else {
                        ftype = "image";
                    }
                    var newArray = [];
                    var nftId =JSON.parse(data.tokenNumber);
                    var geneId =JSON.parse(data.geneId);

                    
                    console.log("req.body.tokenId.",nftId)
                    console.log("req.body.tokenId.length",nftId.length)

                    for (pk = 0; pk < nftId.length; pk++) {
                        let tokeninput = {
                            "tokenName": data.tokenName,
                            "tokenNumber":nftId[pk],
                            "tokenId": nftId[pk],
                            "geneId": geneId[pk],
                            "ownerAddress": data.ownerAddress,
                            "breedCount": data.breedCount,
                            "file": uploadresult.url,
                            "fileType": ftype,
                            "health": data.health,
                            "speed": data.speed,
                            "skill": data.skill,
                            "ability": data.ability,
                            "abilityArr": JSON.parse(data.abilityArr),
                            "bodyParts": JSON.parse(data.bodyParts),
                            "isBreeded": data.isBreeded,
                            "createdDate": new Date(),
                            "orderPlacerName": data.orderPlacerName,
                            "status": data.status,
                            "createdBy": data.createdBy,
                            "type": req.body.type,
                            "nftType": req.body.nftType
                        }
                        queryhelper.insertData('token', tokeninput, (nftcreated) => {
                            if (nftcreated) {
                                let orderinput = {
                                    "tokenId": nftcreated._id,
                                    "price": data.price,
                                    "orderPlacer": data.orderPlacer,
                                    "orderType": data.orderType,
                                    "orderPlacerName": data.orderPlacerName
                                }
                                queryhelper.insertData('order', orderinput, (ordercreated) => {
                                   
                                    newArray.push(ordercreated)
                                    console.log("TypeOF", typeof (ordercreated))
                                    console.log("New Array Length",newArray.length);
                                    if (ordercreated) {
                                        if (newArray.length == nftId.length) {
                                            res.json({ "status": true, "message": "Multiminting Success" })
                                            // console.log("{ status: true, message: Multiminting Success }")
                                        }
                                        else {
                                            console.log("In Progress...")
                                        }
                                    } else {
                                        res.json({ "status": false, "message": "Error occurred in nft order creation. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                            }
                        })
                    }

                } else {
                    res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                }
            })
        }

    } catch (err) {
        console.log("Error catched in create token", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}



exports.createMultipleToken = (req, res) => {
    try {
        for (var i = 0; i <= req.body.length; i++) {
            let data = req.body[i];
            if (data.isBreeded == "false") {
                common.imageUpload(req.file, (uploadresult) => {
                    if (uploadresult.status) {
                        let urlsplit = uploadresult.url.split('.');
                        let filetype = urlsplit[(urlsplit.length) - 1];
                        let ftype;
                        if (filetype == "mp4") {
                            ftype = "video";
                        } else {
                            ftype = "image";
                        }
                        let tokeninput = {
                            "tokenName": data.tokenName,
                            "tokenNumber": data.tokenNumber,
                            "tokenId": data.tokenId,
                            "geneId": data.geneId,
                            "ownerAddress": data.ownerAddress,
                            "breedCount": data.breedCount,
                            "file": uploadresult.url,
                            "fileType": ftype,
                            "health": data.health,
                            "speed": data.speed,
                            "skill": data.skill,
                            "ability": data.ability,
                            "abilityArr": JSON.parse(data.abilityArr),
                            "bodyParts": JSON.parse(data.bodyParts),
                            "isBreeded": data.isBreeded,
                            "createdDate": new Date(),
                            "orderPlacerName": data.orderPlacerName,
                            "status": data.status,
                            "createdBy": data.createdBy,
                            "type": req.body.type,
                            "nftType": req.body.nftType
                        }
                        queryhelper.insertData('token', tokeninput, (nftcreated) => {
                            if (nftcreated) {
                                let orderinput = {
                                    "tokenId": nftcreated._id,
                                    "price": data.price,
                                    "orderPlacer": data.orderPlacer,
                                    "orderType": data.orderType,
                                    "orderPlacerName": data.orderPlacerName
                                }
                                queryhelper.insertData('order', orderinput, (ordercreated) => {
                                    if (ordercreated) {
                                        res.json({ "status": true, "message": "NFT Created successfully" })
                                    } else {
                                        res.json({ "status": false, "message": "Error occurred in nft order creation. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                            }
                        })
                    } else {
                        res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                    }
                })
            } else {
                queryhelper.findoneData('token', { "tokenId": data.parentOneId }, {}, (getparent1) => {
                    if (getparent1) {
                        queryhelper.findoneData('token', { "tokenId": data.parentTwoId }, {}, (getparent2) => {
                            if (getparent2) {
                                if (parseInt(getparent1.breedCount) <= 6) {
                                    if (parseInt(getparent2.breedCount) <= 6) {
                                        common.imageUpload(req.file, (uploadresult) => {
                                            if (uploadresult.status) {
                                                let urlsplit = uploadresult.url.split('.');
                                                let filetype = urlsplit[(urlsplit.length) - 1];
                                                let ftype;
                                                if (filetype == "mp4") {
                                                    ftype = "video";
                                                } else {
                                                    ftype = "image";
                                                }
                                                data.abilityArr = JSON.parse(data.abilityArr);
                                                data.bodyParts = JSON.parse(data.bodyParts);
                                                data.parentOne = getparent1;
                                                data.parentTwo = getparent2;
                                                data.createdDate = new Date();
                                                data.file = uploadresult.url;
                                                data.fileType = ftype;

                                                queryhelper.insertData('token', data, (nftcreated) => {
                                                    if (nftcreated) {
                                                        let nftchild = { ...nftcreated }._doc;
                                                        let parent1breed = parseInt(getparent1.breedCount);
                                                        parent1breed = parent1breed + 1;
                                                        token.updateOne({ "_id": mongoose.Types.ObjectId(getparent1._id) }, { "$push": { "child": nftchild }, "$set": { "breedCount": parent1breed } }, (err, p1update) => {
                                                            if (!err && p1update) {
                                                                let parent2breed = parseInt(getparent2.breedCount);
                                                                parent2breed = parent2breed + 1;
                                                                token.updateOne({ "_id": mongoose.Types.ObjectId(getparent2._id) }, { "$push": { "child": nftchild }, "$set": { "breedCount": parent2breed } }, (err, p2update) => {
                                                                    if (!err && p2update) {
                                                                        res.json({ "status": true, "message": "Nft created successfully" })
                                                                    } else {
                                                                        res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                                                    }
                                                                })
                                                            } else {
                                                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                                            }
                                                        })
                                                    } else {
                                                        res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                                    }
                                                })
                                            } else {
                                                res.json({ "status": false, "message": "Error occurred in nft creation. Please try again later" })
                                            }
                                        })
                                    } else {
                                        res.json({ "status": false, "message": "Parent two breed count has been reached. Unable to breed using parent two" })
                                    }
                                } else {
                                    res.json({ "status": false, "message": "Parent one breed count has been reached. Unable to breed using parent one" })
                                }
                            } else {
                                res.json({ "status": false, "message": "Invalid parent Id" })
                            }
                        })
                    } else {
                        res.json({ "status": false, "message": "Invalid parent Id" })
                    }
                })
            }
        }

    } catch (err) {
        console.log("Error catched in create token", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}
exports.createOrder = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('token', { "_id": mongoose.Types.ObjectId(data.tokenId) }, {}, (gettoken) => {
            if (gettoken) {
                queryhelper.updateData('order', 'one', { "tokenId": data.tokenId }, data, (updated) => {
                    if (updated) {
                        let update = {
                            "ownerAddress": data.orderPlacer,
                            "ownerChangedAt": new Date(),
                            "status": data.status,
                            "type": "Normal"
                        }
                        queryhelper.updateData('token', 'one', { "_id": mongoose.Types.ObjectId(data.tokenId) }, update, (ownerupdate) => {
                            if (ownerupdate) {
                                res.json({ "status": true, "message": "Buy Order Created successfully" })
                            } else {
                                res.json({ "status": false, "message": "Error occurred in order creation and owner updation. Please try again later" })
                            }
                        })
                    } else {
                        res.json({ "status": false, "message": "Error occurred in order Creation. Please try again later" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Invalid token Id" })
            }
        })
    } catch (err) {
        console.log("Error catched in create order", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getTokenList = (req, res) => {
    try {
        let address = req.params.address;
        if (req.params.address != undefined && typeof req.params.address != 'undefined') {

            token.aggregate([
                {
                    "$lookup": {
                        "from": "cq_TQYHURDKZW",
                        "localField": "_id",
                        "foreignField": "tokenId",
                        "as": "selldata"
                    }
                },
                {
                    "$project": {
                        "_id": 1,
                        "tokenName": 1,
                        "tokenNumber": 1,
                        "tokenId": 1,
                        "geneId": 1,
                        "file": 1,
                        "fileType": 1,
                        "ownerAddress": 1,
                        "breedCount": 1,
                        "health": 1,
                        "speed": 1,
                        "skill": 1,
                        "ability": 1,
                        "abilityArr": 1,
                        "bodyParts": 1,
                        "isBreeded": 1,
                        "parentOneId": 1,
                        "parentTwoId": 1,
                        "child": 1,
                        "ownerChangedAt": 1,
                        "type": 1,
                        "isSell": {
                            "$cond": {
                                if: { "$gt": [{ "$size": "$selldata" }, 0] },
                                then: "true", else: "false"
                            }
                        }
                    }
                },
                {
                    "$match": {
                        "ownerAddress": address
                    }
                },
                {
                    "$sort": {
                        "_id": -1
                    }
                }
            ], (err, getlist) => {
                if (getlist.length > 0) {
                    res.json({ "status": true, "message": "success", "data": getlist })
                } else {
                    res.json({ "status": true, "message": "success", "data": [] })
                }
            })
        } else {
            res.json({ "status": false, "message": "Address is required" })
        }
    } catch (err) {
        console.log("Error catched in get token list", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getSingleToken = (req, res) => {
    try {
        let id = req.params.id;
        if (req.params.id != undefined && typeof req.params.id != 'undefined') {
            queryhelper.findoneData('token', { "_id": mongoose.Types.ObjectId(id) }, {}, (getdata) => {
                if (getdata) {
                    res.json({ "status": true, "message": "success", "data": getdata })
                } else {
                    res.json({ "status": false, "message": "success", "data": {} })
                }
            })
        } else {
            res.json({ "status": false, "message": "Id is required" })
        }
    } catch (err) {
        console.log("Error catched in get single token", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getOrderList = (req, res) => {


    try {
        let address = req.params.address;
        let data = req.body;
        let cnt = [];


        if (data.search != undefined && data.search != "undefined" && data.search != "") {
            if (address != "null") {
                cnt = [{ "orderType": "sell" }, { "ownerAddress": { "$ne": address } }];

                if (data.search.health != undefined && typeof data.search.health != "undefined" && data.search.health != "") {
                    let obj = { "health": { "$lte": data.search.health } };
                    cnt.push(obj);
                }
                if (data.search.speed != undefined && typeof data.search.speed != "undefined" && data.search.speed != "") {
                    let obj = { "speed": { "$lte": data.search.speed } };
                    cnt.push(obj);
                }
                if (data.search.skill != undefined && typeof data.search.skill != "undefined" && data.search.skill != "") {
                    let obj = { "skill": { "$lte": data.search.skill } };
                    cnt.push(obj);
                }
                if (data.search.ability != undefined && typeof data.search.ability != "undefined" && data.search.ability != "") {
                    let obj = { "ability": { "$lte": data.search.ability } };
                    cnt.push(obj);
                }
                if (data.search.breedName != undefined && typeof data.search.breedName != "undefined" && data.search.breedName != "") {
                    let list = [];
                    if (data.search.breedName.length > 0) {
                        let breeds = data.search.breedName;
                        for (let i = 0; i < breeds.length; i++) {
                            let lobj = { "tokenName": new RegExp(breeds[i], "i") };
                            list.push(lobj);
                        }
                        let obj = { "$or": list };
                        cnt.push(obj);
                    }
                }
                if (data.search.breedCount != undefined && typeof data.search.breedCount != "undefined" && data.search.breedCount != "") {
                    let obj = { "breedCount": { "$lte": data.search.breedCount } };
                    cnt.push(obj);
                }
                if (data.search.bodyParts != undefined && typeof data.search.bodyParts != "undefined" && data.search.bodyParts != "") {
                    let obj = { "bodyParts": { "$elemMatch": { "name": data.search.bodyParts, "status": true } } };
                    cnt.push(obj);
                }
                if (data.search.abilities != undefined && typeof data.search.abilities != "undefined" && data.search.abilities != "") {
                    let obj = { "abilityArr": { "$elemMatch": { "name": data.search.abilities, "status": true } } };
                    cnt.push(obj);
                }

            }

            else if (address == "null") {
                cnt = [{ "orderType": "sell" }];

                if (data.search.health != undefined && typeof data.search.health != "undefined" && data.search.health != "") {
                    let obj = { "health": { "$lte": data.search.health } };
                    cnt.push(obj);
                }
                if (data.search.speed != undefined && typeof data.search.speed != "undefined" && data.search.speed != "") {
                    let obj = { "speed": { "$lte": data.search.speed } };
                    cnt.push(obj);
                }
                if (data.search.skill != undefined && typeof data.search.skill != "undefined" && data.search.skill != "") {
                    let obj = { "skill": { "$lte": data.search.skill } };
                    cnt.push(obj);
                }
                if (data.search.ability != undefined && typeof data.search.ability != "undefined" && data.search.ability != "") {
                    let obj = { "ability": { "$lte": data.search.ability } };
                    cnt.push(obj);
                }
                if (data.search.breedName != undefined && typeof data.search.breedName != "undefined" && data.search.breedName != "") {
                    let list = [];
                    if (data.search.breedName.length > 0) {
                        let breeds = data.search.breedName;
                        for (let i = 0; i < breeds.length; i++) {
                            let lobj = { "tokenName": new RegExp(breeds[i], "i") };
                            list.push(lobj);
                        }
                        let obj = { "$or": list };
                        cnt.push(obj);
                    }
                }
                if (data.search.breedCount != undefined && typeof data.search.breedCount != "undefined" && data.search.breedCount != "") {
                    let obj = { "breedCount": { "$lte": data.search.breedCount } };
                    cnt.push(obj);
                }
                if (data.search.bodyParts != undefined && typeof data.search.bodyParts != "undefined" && data.search.bodyParts != "") {
                    let obj = { "bodyParts": { "$elemMatch": { "name": data.search.bodyParts, "status": true } } };
                    cnt.push(obj);
                }
                if (data.search.abilities != undefined && typeof data.search.abilities != "undefined" && data.search.abilities != "") {
                    let obj = { "abilityArr": { "$elemMatch": { "name": data.search.abilities, "status": true } } };
                    cnt.push(obj);
                }

            }

            order.aggregate([
                {
                    "$lookup": {
                        "from": "cq_YSITFHZPLQ",
                        "localField": "tokenId",
                        "foreignField": "_id",
                        "as": "tokendata"
                    }
                },
                {
                    "$project": {
                        "tokenName": { "$arrayElemAt": ["$tokendata.tokenName", 0] },
                        "tokenNumber": { "$arrayElemAt": ["$tokendata.tokenNumber", 0] },
                        "breedCount": { "$arrayElemAt": ["$tokendata.breedCount", 0] },
                        "geneId": { "$arrayElemAt": ["$tokendata.geneId", 0] },
                        "tokenId": { "$arrayElemAt": ["$tokendata.tokenId", 0] },
                        "token_id": { "$arrayElemAt": ["$tokendata._id", 0] },
                        "ownerAddress": { "$arrayElemAt": ["$tokendata.ownerAddress", 0] },
                        "file": { "$arrayElemAt": ["$tokendata.file", 0] },
                        "fileType": { "$arrayElemAt": ["$tokendata.fileType", 0] },
                        "health": { "$arrayElemAt": ["$tokendata.health", 0] },
                        "speed": { "$arrayElemAt": ["$tokendata.speed", 0] },
                        "skill": { "$arrayElemAt": ["$tokendata.skill", 0] },
                        "ability": { "$arrayElemAt": ["$tokendata.ability", 0] },
                        "orderType": "$orderType",
                        "orderPlacer": "$orderPlacer",
                        "price": "$price",
                        "datetime": "$datetime",
                        "bodyParts": { "$arrayElemAt": ["$tokendata.bodyParts", 0] },
                        "abilityArr": { "$arrayElemAt": ["$tokendata.abilityArr", 0] },
                        "isBreeded": { "$arrayElemAt": ["$tokendata.isBreeded", 0] },
                        "orderPlacerName": { "$arrayElemAt": ["$tokendata.orderPlacerName", 0] },
                        "type": { "$arrayElemAt": ["$tokendata.type", 0] },

                        "_id": "$_id"
                    }
                },
                {
                    "$match": {
                        "$and": cnt
                    }
                },
                {
                    "$sort": {
                        "datetime": -1
                    }
                }
            ], (err, result) => {
                if (!err && result.length > 0) {
                    res.json({ "status": true, "message": "success", "data": result })
                } else {
                    res.json({ "status": true, "message": "success", "data": [] })
                }
            })
        } else {
            res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later1" })
        }
    } catch (err) {
        console.log("Error catched in get order list", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.createBreed = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('token', { "tokenId": data.parentOneId }, {}, (getparent1) => {
            if (getparent1) {
                queryhelper.findoneData('token', { "tokenId": data.parentTwoId }, {}, (getparent2) => {
                    if (getparent2) {
                        if (parseInt(getparent1.breedCount) <= 6) {
                            if (parseInt(getparent2.breedCount) <= 6) {
                                queryhelper.insertData('breedrequest', data, (created) => {
                                    if (created) {
                                        res.json({ "status": true, "message": "Breed request has been created" })
                                    } else {
                                        res.json({ "status": false, "message": "Error occurred in breed request. Please try again later" })
                                    }
                                })
                            } else {
                                res.json({ "status": false, "message": "Parent two breed count has been reached. Unable to breed using parent two" })
                            }
                        } else {
                            res.json({ "status": false, "message": "Parent one breed count has been reached. Unable to breed using parent one" })
                        }
                    } else {
                        res.json({ "status": false, "message": "Invalid parent Id" })
                    }
                })
            } else {
                res.json({ "status": false, "message": "Invalid parent Id" })
            }
        })
    } catch (err) {
        console.log("Error catched in create breed", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getBreedRequest = (req, res) => {
    try {
        let date = new Date();
        date.setMinutes(date.getMinutes() - 15);
        queryhelper.findData('breedrequest', { "status": 0, "createdAt": { "$lte": date } }, {}, { "_id": -1 }, 0, (getbreed) => {
            if (getbreed.length > 0) {
                res.json({ "status": true, "message": "success", "data": getbreed })
            } else {
                res.json({ "status": true, "message": "success", "data": [] })
            }
        })
    } catch (err) {
        console.log("Error catched in get breed request", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.breedStatusChange = (req, res) => {
    try {
        let data = req.body;
        queryhelper.findoneData('breedrequest', { "_id": mongoose.Types.ObjectId(data.breedId) }, {}, (getbreed) => {
            if (getbreed) {
                if (getbreed.status == 0) {
                    queryhelper.updateData('breedrequest', 'one', { "_id": mongoose.Types.ObjectId(getbreed._id) }, { "status": 1 }, (updated) => {
                        if (updated) {
                            res.json({ "status": true, "message": "Breed request updated successfully" })
                        } else {
                            res.json({ "status": false, "message": "Error occurred in breed status change. Please try again later" })
                        }
                    })
                } else {
                    res.json({ "status": false, "message": "Breed request has been processed already" })
                }
            } else {
                res.json({ "status": false, "message": "Invalid breed Id" })
            }
        })
    } catch (err) {
        console.log("Error catched in breed status change", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.dashboard = (req, res) => {
    try {
        let data = req.body;
        let date = new Date();
        let beforedate = new Date();
        beforedate.setDate(beforedate.getDate() - data.days);
        async.parallel({
            "recentlyListed": function (cb) {
                order.aggregate([
                    {
                        "$lookup": {
                            "from": "cq_YSITFHZPLQ",
                            "localField": "tokenId",
                            "foreignField": "_id",
                            "as": "tokendata"
                        }
                    },
                    {
                        "$project": {
                            "tokenName": { "$arrayElemAt": ["$tokendata.tokenName", 0] },
                            "tokenNumber": { "$arrayElemAt": ["$tokendata.tokenNumber", 0] },
                            "breedCount": { "$arrayElemAt": ["$tokendata.breedCount", 0] },
                            "geneId": { "$arrayElemAt": ["$tokendata.geneId", 0] },
                            "tokenId": { "$arrayElemAt": ["$tokendata.tokenId", 0] },
                            "token_id": { "$arrayElemAt": ["$tokendata._id", 0] },
                            "ownerAddress": { "$arrayElemAt": ["$tokendata.ownerAddress", 0] },
                            "file": { "$arrayElemAt": ["$tokendata.file", 0] },
                            "fileType": { "$arrayElemAt": ["$tokendata.fileType", 0] },
                            "health": { "$arrayElemAt": ["$tokendata.health", 0] },
                            "speed": { "$arrayElemAt": ["$tokendata.speed", 0] },
                            "skill": { "$arrayElemAt": ["$tokendata.skill", 0] },
                            "ability": { "$arrayElemAt": ["$tokendata.ability", 0] },
                            "orderType": "$orderType",
                            "orderPlacer": "$orderPlacer",
                            "price": "$price",
                            "datetime": "$datetime",
                            "bodyParts": { "$arrayElemAt": ["$tokendata.bodyParts", 0] },
                            "abilityArr": { "$arrayElemAt": ["$tokendata.abilityArr", 0] },
                            "isBreeded": { "$arrayElemAt": ["$tokendata.isBreeded", 0] },
                            "_id": "$_id",
                            "type": { "$arrayElemAt": ["$tokendata.type", 0] },

                        }
                    },
                    {
                        "$match": {
                            "$and": [{ "orderType": "sell" }, { "datetime": { "$gte": beforedate } }, { "datetime": { "$lte": date } }]
                        }
                    },
                    {
                        "$sort": {
                            "datetime": -1
                        }
                    }
                ]).exec(cb)
            },
            "recentlySold": function (cb) {
                order.aggregate([
                    {
                        "$lookup": {
                            "from": "cq_YSITFHZPLQ",
                            "localField": "tokenId",
                            "foreignField": "_id",
                            "as": "tokendata"
                        }
                    },
                    {
                        "$project": {
                            "tokenName": { "$arrayElemAt": ["$tokendata.tokenName", 0] },
                            "tokenNumber": { "$arrayElemAt": ["$tokendata.tokenNumber", 0] },
                            "breedCount": { "$arrayElemAt": ["$tokendata.breedCount", 0] },
                            "geneId": { "$arrayElemAt": ["$tokendata.geneId", 0] },
                            "tokenId": { "$arrayElemAt": ["$tokendata.tokenId", 0] },
                            "token_id": { "$arrayElemAt": ["$tokendata._id", 0] },
                            "ownerAddress": { "$arrayElemAt": ["$tokendata.ownerAddress", 0] },
                            "file": { "$arrayElemAt": ["$tokendata.file", 0] },
                            "fileType": { "$arrayElemAt": ["$tokendata.fileType", 0] },
                            "health": { "$arrayElemAt": ["$tokendata.health", 0] },
                            "speed": { "$arrayElemAt": ["$tokendata.speed", 0] },
                            "skill": { "$arrayElemAt": ["$tokendata.skill", 0] },
                            "ability": { "$arrayElemAt": ["$tokendata.ability", 0] },
                            "orderType": "$orderType",
                            "orderPlacer": "$orderPlacer",
                            "price": "$price",
                            "datetime": "$datetime",
                            "bodyParts": { "$arrayElemAt": ["$tokendata.bodyParts", 0] },
                            "abilityArr": { "$arrayElemAt": ["$tokendata.abilityArr", 0] },
                            "isBreeded": { "$arrayElemAt": ["$tokendata.isBreeded", 0] },
                            "_id": "$_id",
                            "type": { "$arrayElemAt": ["$tokendata.type", 0] },

                        }
                    },
                    {
                        "$match": {
                            "$and": [{ "orderType": "buy" }, { "datetime": { "$gte": beforedate } }, { "datetime": { "$lte": date } }]
                        }
                    },
                    {
                        "$sort": {
                            "datetime": -1
                        }
                    }
                ]).exec(cb);
            },
            "totalSale": function (cb) {
                order.aggregate([
                    {
                        "$lookup": {
                            "from": "cq_YSITFHZPLQ",
                            "localField": "tokenId",
                            "foreignField": "_id",
                            "as": "tokendata"
                        }
                    },
                    {
                        "$project": {
                            "tokenName": { "$arrayElemAt": ["$tokendata.tokenName", 0] },
                            "tokenNumber": { "$arrayElemAt": ["$tokendata.tokenNumber", 0] },
                            "breedCount": { "$arrayElemAt": ["$tokendata.breedCount", 0] },
                            "geneId": { "$arrayElemAt": ["$tokendata.geneId", 0] },
                            "tokenId": { "$arrayElemAt": ["$tokendata.tokenId", 0] },
                            "token_id": { "$arrayElemAt": ["$tokendata._id", 0] },
                            "ownerAddress": { "$arrayElemAt": ["$tokendata.ownerAddress", 0] },
                            "file": { "$arrayElemAt": ["$tokendata.file", 0] },
                            "fileType": { "$arrayElemAt": ["$tokendata.fileType", 0] },
                            "health": { "$arrayElemAt": ["$tokendata.health", 0] },
                            "speed": { "$arrayElemAt": ["$tokendata.speed", 0] },
                            "skill": { "$arrayElemAt": ["$tokendata.skill", 0] },
                            "ability": { "$arrayElemAt": ["$tokendata.ability", 0] },
                            "orderType": "$orderType",
                            "orderPlacer": "$orderPlacer",
                            "price": "$price",
                            "datetime": "$datetime",
                            "bodyParts": { "$arrayElemAt": ["$tokendata.bodyParts", 0] },
                            "abilityArr": { "$arrayElemAt": ["$tokendata.abilityArr", 0] },
                            "isBreeded": { "$arrayElemAt": ["$tokendata.isBreeded", 0] },
                            "_id": "$_id",
                            "type": { "$arrayElemAt": ["$tokendata.type", 0] },

                        }
                    },
                    {
                        "$match": {
                            "$and": [{ "orderType": "buy" }, { "datetime": { "$gte": beforedate } }, { "datetime": { "$lte": date } }]
                        }
                    },
                    {
                        "$group": {
                            "_id": "",
                            "total": { "$sum": "$price" }
                        }
                    }
                ]).exec(cb);
            }
        }, (err, results) => {
            if (!err) {
                if (results.totalSale.length > 0) {
                    results.totalSale = results.totalSale[0].total;
                } else {
                    results.totalSale = 0;
                }
                results.totalSparce = results.recentlySold.length;
                res.json({ "status": true, "message": "success", "data": results })
            } else {
                let result = {
                    "recentlyListed": [],
                    "recentlySold": [],
                    "totalSale": 0,
                    "totalSparce": 0
                }
                res.json({ "status": true, "message": "success", "data": result })
            }
        })
    } catch (err) {
        console.log("Error catched in dashboard", err);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.createProfile = (req, res) => {
    try {
        let data = req.body;


        queryhelper.findoneData('createProfile', { "userAddress": data.userAddress }, {}, (getData) => {
            if (getData) {
                res.json({ "status": false, "message": "Profile Already Exists" })
            }
            else {
                common.imageUpload(req.file, (uploadresult) => {
                    console.log("Admin profile image", uploadresult)
                    if (uploadresult.status) {

                        let input = {
                            "userName": data.userName,
                            "email": data.email,
                            "userAddress": data.userAddress,
                            "profileImage": uploadresult.url
                        }

                        queryhelper.insertData('createProfile', input, (profileCreated) => {
                            if (profileCreated) {
                                res.json({ "status": true, "message": "Profile Created successfully" })
                            } else {
                                res.json({ "status": false, "message": "Error occurred in profile creation. Please try again later" })
                            }
                        })
                    }
                    else {
                        res.json({ "status": false, "message": "Error occurred in admin profile creation. Please try again later" })
                    }
                })
            }
        })


    } catch (err) {
        console.log("Error catched in createProfile", err)
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }

}

exports.getProfileDetails = (req, res) => {
    try {
        let data = req.params.userAddress;

        queryhelper.findoneData('createProfile', { "userAddress": data }, {}, (getData) => {

            if (getData) {
                res.json({ "status": true, "message": "user details", "data": getData })
            } else {
                res.json({ "status": false, "message": "Invalid user Address" })
            }

        })
    } catch (err) {
        console.log("Error catched in createProfile", err)
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}


exports.updateProfileDetails = (req, res) => {
    try {
        let data = req.body;
        common.imageUpload(req.file, (uploadresult) => {
            if (uploadresult.status) {

                let updateData = {
                    "email": data.email,
                    "userName": data.userName,
                    "profileImage": uploadresult.url
                }
                queryhelper.updateData('createProfile', 'one', { userAddress: data.userAddress }, updateData, (updated) => {
                    if (updated) {
                        res.json({ status: true, message: "Profile Updated" });
                    }
                    else {
                        res.json({ status: false, message: "Unable to update" })
                    }
                })
            }
            else {
                res.json({ "status": false, "message": "Error occurred in admin profile creation. Please try again later" })
            }
        })
    }
    catch (err) {
        console.log("Error catched in update profile", err)
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.fileUpload=(req,res)=>{

    common.imageUpload(req.file, (uploadresult) => {
        if (uploadresult.status) {
            let urlsplit = uploadresult.url.split('.');
            let filetype = urlsplit[(urlsplit.length) - 1];
            
            res.json({ "status": true, "message": "File Uploaded Successfully",URL:uploadresult.url })


        } else {
            res.json({ "status": false, "message": "Error occurred in file upload. Please try again later" })
        }
    })
}