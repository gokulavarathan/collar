const mongoose = require('mongoose');

const queryhelper = require('../srepleh/yreuq');
const common = require('../srepleh/nommoc');
const activity = mongoose.model('activity');

exports.addActivity = (req, res) => {
    try {
        let data = req.body;
        let input;
        if (data.type == "breed") {
           
            input = {
                "type": data.type,
                "parentOne": data.parentOne,
                "parentTwo": data.parentTwo,
                "parentOneName": data.parentOneName,
                "parentTwoName": data.parentTwoName,
                "address": data.address
            }

        } else {
            input = {
                "ownerName": data.ownerName,
                "amount": data.amount,
                "nftName": data.nftName,
                "address": data.address,
                "type": data.type
            }
        }
        queryhelper.insertData('activity', input, (posteddata) => {
            if (posteddata) {
                res.json({ status: true, message: 'data posted succesfully', "data": posteddata })
            }
            else {
                res.json({ "status": false, "message": "Error in posting activity. Please try again later" })
            }
        })
    }
    catch (e) {
        console.log("Error catched in posting activity", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.listActivity = (req, res) => {
    try {
        let data = req.params.userAddress
        activity.find({ "address": req.params.userAddress }).sort({ _id: -1 }).exec(function (err, result) {
            if (err) {
                console.log("result", result)
                res.json({ status: false, message: "Error" });
            }
            else {
                console.log("result", result)

                res.json({ status: true, message: "Success", data: result })
            }
        });

        // activity.aggregate([

        //     { $sort: { _id: -1 } },
        //     {
        //         "$match": {
        //             "address": req.params.userAddress
        //         }
        //     }
        //     ,
        //     {
        //         $group: {
        //             _id: "$date",
        //             amount: { $last: "$amount" },
        //             ownerName: { $last: "$ownerName" },
        //             nftName: { $last: "$nftName" },
        //             address: { $last: "$address" },
        //         },
        //     },
        // ], (err, result) => {
        //     if (err) {
        //         console.log("result",result)
        //         res.json({ status: false, message: "Error" });
        //     }
        //     else {
        //         console.log("result",result)

        //         res.json({ status: true, message: "Success", data: result })
        //     }
        // });
    }
    catch (e) {
        console.log("Error catched in listing activity", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.schloarship = (req, res) => {
    try {

        let data = req.body;
        let input = {
            "userName": data.name,
            "telegram": data.telegram,
            "email": data.email,
            "country": data.country,
            "age": data.age,
            "languageLevel": data.languageLevel,
            "nativeLanguage": data.nativeLanguage,
            "gender": data.gender,
            "comments": data.comments
        }

        queryhelper.insertData('scholarship', input, (posteddata) => {
            if (posteddata) {
                res.json({ status: true, message: 'data posted succesfully', "data": posteddata })
            }
            else {
                res.json({ "status": false, "message": "Error in posting activity. Please try again later" })
            }
        })


    } catch (e) {
        console.log("Error catched in posting activity", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}

exports.getScholarShip = (req, res) => {
    try {
        queryhelper.findData("scholarship", {}, {}, {}, 0, (response) => {
            res.send({
                status: 200,
                Message: "Scholarship data",
                result: response
            })
        })

    } catch (e) {
        console.log("Error catched in posting activity", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}
