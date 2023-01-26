const validator = require('node-validator');

let emptycheck = /([^\s])/;
let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;
        
        let data = req.body;
        let check;
        if (path == '/deleteWhitelist') {
            check = validator.isObject()
                .withRequired('_id', validator.isString({ regex: emptycheck, message: "_id is required" }))
        }
        else if (path == '/addWhitelistManual') {
            check = validator.isObject()
                .withRequired('ip', validator.isString({ regex: emptycheck, message: "Ip is required" }))
        }
        else if (path == '/addBlocklist') {
            check = validator.isObject()
                .withRequired('ip', validator.isString({ regex: emptycheck, message: "Ip is required" }))
        }
        else if (path == '/deleteBlocklist') {
            check = validator.isObject()
                .withRequired('_id', validator.isString({ regex: emptycheck, message: "_id is required" }))
        }
        else if (path == '/login') {
            check = validator.isObject()
                .withRequired('email', validator.isString({ regex: email, message: "Please provide valid email" }))
                .withRequired('password', validator.isString({ regex: emptycheck, message: "Please provide valid password" }))
                .withRequired('pattern', validator.isString({ regex: emptycheck, message: "Please provide valid pattern" }))
                .withOptional('otp', validator.isString({ regex: emptycheck, message: "Otp is required" }))
        }
        else if (path == '/tfasetup') {
            check = validator.isObject()
                .withOptional('tfaenablekey', validator.isString({ regex: emptycheck, message: "Please provide valid tfa enable key" }))
                .withOptional('token', validator.isString())
        }
        else if (path == '/changePassword') {
            check = validator.isObject()
                .withRequired('currentpassword', validator.isString({ regex: emptycheck, message: "Please provide valid current password" }))
                .withRequired('newpassword', validator.isString({ regex: emptycheck, message: "Please provide valid new password" }))
                .withRequired('confirmpassword', validator.isString({ regex: emptycheck, message: "Please provide valid confirm password" }))
        }
        else if (path == '/changePattern') {
            check = validator.isObject()
                .withRequired('currentpattern', validator.isString({ regex: emptycheck, message: "Please provide valid current pattern" }))
                .withRequired('newpattern', validator.isString({ regex: emptycheck, message: "Please provide valid new pattern" }))
                .withRequired('confirmpattern', validator.isString({ regex: emptycheck, message: "Please provide valid confirm pattern" }))
        }
        else if (path == '/singlecms') {
            check = validator.isObject()
                .withRequired('_id', validator.isString({ regex: emptycheck, message: "_id is required" }))
        }
        else if (path == '/createToken') {
            check = validator.isObject()
                .withRequired('tokenName', validator.isString({ regex: emptycheck, message: "Token Name is required" }))
                .withRequired('tokenNumber', validator.isString({ regex: emptycheck, message: "Token Number is required" }))
                .withRequired('tokenId', validator.isString({ regex: emptycheck, message: "Token Id is required" }))
                .withRequired('geneId', validator.isString({ regex: emptycheck, message: "Gene Id is required" }))
                .withRequired('ownerAddress', validator.isString({ regex: emptycheck, message: "Owner address is required" }))
                .withRequired('breedCount', validator.isString({ regex: emptycheck, message: "Breedcount is required" }))
                .withRequired('health', validator.isString({ regex: emptycheck, message: "Health value is required" }))
                .withRequired('speed', validator.isString({ regex: emptycheck, message: "Speed value is required" }))
                .withRequired('skill', validator.isString({ regex: emptycheck, message: "Skill value is required" }))
                .withRequired('ability', validator.isString({ regex: emptycheck, message: "Ability value is required" }))
                .withRequired('powerBlast', validator.isString())
                .withRequired('shinningSeas', validator.isString())
                .withRequired('dinoPunch', validator.isString())
                .withRequired('tinyTornado', validator.isString())
                .withRequired('heatBlast', validator.isString())
                .withRequired('twitchBite', validator.isString())
                .withOptional('orderType', validator.isString({ regex: emptycheck, message: "Order type is required" }))
                .withOptional('orderPlacer', validator.isString({ regex: emptycheck, message: "orderPlacer is required" }))
                .withOptional('price', validator.isString({ regex: emptycheck, message: "Price is required" }))
                .withRequired('bodyParts', validator.isString())
                .withRequired('abilityArr', validator.isString())
                .withRequired('isBreeded', validator.isString())
                .withOptional('parentOneId', validator.isString())
                .withOptional('parentTwoId', validator.isString())
                .withOptional('orderPlacerName', validator.isString())
                .withOptional('status', validator.isString())
                .withOptional('createdBy', validator.isString())
                .withOptional('type', validator.isString())

                .withOptional('mintType', validator.isString())
                .withOptional('nftType', validator.isString())

                .withOptional('weapon', validator.isString({ regex: emptycheck, message: "weapon is required" }))




        }
        else if (path == '/createOrder') {
            check = validator.isObject()
                .withRequired('tokenId', validator.isString({ regex: emptycheck, message: "Token Id is required" }))
                .withRequired('orderType', validator.isString({ regex: emptycheck, message: "Order type is required" }))
                .withRequired('orderPlacer', validator.isString({ regex: emptycheck, message: "orderPlacer is required" }))
                .withRequired('price', validator.isString({ regex: emptycheck, message: "Price is required" }))
                .withRequired('orderPlacerName', validator.isString({ regex: emptycheck, message: "orderPlacerName is required" }))
                .withRequired('status', validator.isString({ regex: emptycheck, message: "status is required" }))


        }
        else if (path == '/createBreed') {
            check = validator.isObject()
                .withRequired('userAddress', validator.isString({ regex: emptycheck, message: "User Address is required" }))
                .withRequired('parentOneId', validator.isString({ regex: emptycheck, message: "Parent one Id is required" }))
                .withRequired('parentTwoId', validator.isString({ regex: emptycheck, message: "Parent two Id is required" }))
                .withRequired('eggId', validator.isString({ regex: emptycheck, message: "Egg id is required" }))
        }
        else if (path == '/breedStatusChange') {
            check = validator.isObject()
                .withRequired('breedId', validator.isString({ regex: emptycheck, message: "Breed Id is required" }))
        }
        else if (path == '/recentSell' || path == '/recentBuy') {
            check = validator.isObject()
                .withRequired('days', validator.isNumber())
        }
        else if (path == '/dashboard') {
            check = validator.isObject()
                .withRequired('days', validator.isNumber())
        } else if (path == '/createProfile') {
            console.log("comming profile")

            check = validator.isObject()
                .withRequired('userName', validator.isString({ regex: emptycheck, message: "userName is required" }))
                .withRequired('email', validator.isString({ regex: emptycheck, message: "email is required" }))
                .withRequired('userAddress', validator.isString({ regex: emptycheck, message: "userAddress is required" }))

        }
        else if (path == "/postactivity") {
            if(data.type == "breed"){
                console.log(data,"data.type")
                check = validator.isObject()
                .withRequired('type', validator.isString({ regex: emptycheck, message: "type is required" }))
                .withRequired('parentOne', validator.isString({ regex: emptycheck, message: "parentOne is required" }))
                .withRequired('parentTwo', validator.isString({ regex: emptycheck, message: "parentTwo is required" }))
                .withRequired('parentOneName', validator.isString({ regex: emptycheck, message: "parentOneName is required" }))
                .withRequired('parentTwoName', validator.isString({ regex: emptycheck, message: "parentTwoName is required" }))
                .withRequired('address', validator.isString({ regex: emptycheck, message: "address is required" }))

            }else{
                check = validator.isObject()
                .withRequired('type', validator.isString({ regex: emptycheck, message: "type is required" }))
                .withRequired('ownerName', validator.isString({ regex: emptycheck, message: "ownerName is required" }))
                .withRequired('amount', validator.isString({ regex: emptycheck, message: "amount is required" }))
                .withRequired('nftName', validator.isString({ regex: emptycheck, message: "nftName is required" }))
                .withRequired('address', validator.isString({ regex: emptycheck, message: "address is required" }))

            }
            
        }
        else if (path = "/updateprofile") {
            check = validator.isObject()
                .withRequired('userAddress', validator.isString({ regex: emptycheck, message: "userAddress is required" }))
                .withRequired('email', validator.isString({ regex: email, message: "email is required" }))
                .withRequired('userName', validator.isString({ regex: emptycheck, message: "userName is required" }))
        }
        else if (path = "/whitelist") {
            check = validator.isObject()
                .withRequired('whitelist', validator.isString({ regex: emptycheck, message: "IP is required" }))
        }
        else if (path == '/scholarship') {

            check = validator.isObject()
                .withRequired('userName', validator.isString({ regex: emptycheck, message: "userName is required" }))
                .withRequired('telegram', validator.isString({ regex: emptycheck, message: "telegram is required" }))
                .withRequired('email', validator.isString({ regex: emptycheck, message: "email is required" }))

                .withRequired('country', validator.isString({ regex: emptycheck, message: "country is required" }))

                .withRequired('age', validator.isString({ regex: emptycheck, message: "age is required" }))

                .withRequired('languageLevel', validator.isString({ regex: emptycheck, message: "languageLevel is required" }))

                .withRequired('nativeLanguage', validator.isString({ regex: emptycheck, message: "nativeLanguage is required" }))

                .withRequired('gender', validator.isString({ regex: emptycheck, message: "gender is required" }))
                .withRequired('comments', validator.isString({ regex: emptycheck, message: "comments is required" }))



        }
        validator.run(check, data, (errorcount, errors) => {
            if (errorcount == 0) {
                next();
            } else {
                console.log(errors,"errors")
                let errormsg = '';
                for (let i = 0; i < errors.length; i++) {
                    if (errormsg != '') {
                        errormsg += ', ';
                    }
                    if (errors[i].message == 'Required value.' && errors[i].value == undefined) {
                        errors[i].message = errors[i].parameter + ' is required'
                    } else if (errors[i].value != undefined || errors[i].value == "" || errors[i].value == [] || errors[i].message == "Unexpected value.") {
                        errors[i].message = "Not a valid " + errors[i].parameter
                    } else {
                        errors[i].message = errors[i].message;
                    }
                    errormsg += errors[i].message;
                }
                res.json({ "status": false, "message": errormsg })
            }
        })
    } catch (e) {
        console.log("Error catched in validation", e);
        res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
    }
}