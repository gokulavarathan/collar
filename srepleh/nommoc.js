const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');

const config = require('../sliatededon/gifnoc');

let key = CryptoJS.enc.Base64.parse(config.cryptoKey);
let iv = CryptoJS.enc.Base64.parse(config.cryptoIv);
let jwtTokenAdmin = config.jwtTokenAdmin;
const s3 = new aws.S3(config.awsOptions);

let encrypt = exports.encrypt = (value) => {
    let cipher = CryptoJS.AES.encrypt(value, key, { iv: iv }).toString();
    return cipher;
};

let decrypt = exports.decrypt = (value) => {
    let decipher = CryptoJS.AES.decrypt(value, key, { iv: iv });
    let decrypt_val = decipher.toString(CryptoJS.enc.Utf8);
    return decrypt_val;
};

exports.createPayloadAdmin = (key) => {
    let payload = { subject: key };
    let token = jwt.sign(payload, jwtTokenAdmin, { "expiresIn": 60 * 30 });
    return token;
}

exports.tokenMiddlewareAdmin = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        if (token != null) {
            jwt.verify(token, jwtTokenAdmin, (err, payload) => {
                if (payload) {
                    let userid = decrypt(payload.subject);
                    req.userId = userid;
                    next();
                } else {
                    res.json({ "status": false, "message": "Unauthorized" })
                }
            })
        } else {
            res.json({ "status": false, "message": "Unauthorized" })
        }
    } else {
        res.json({ "status": false, "message": "Unauthorized" })
    }
}

exports.imageUpload = (file, callback) => {
    try {
        if (file != undefined && typeof file != 'undefined') {
            console.log(file,"file")
            let splits = file.originalname.split('.');
            const params = {
                Bucket: config.awsOptions.Bucket,
                Key: Date.now().toString() + '.' + splits[(splits.length) - 1],
                Body: file.buffer,
                ACL: 'public-read'
            }
            s3.upload(params, (err, data) => {
                if (err) {
            console.log(err,"err")

                    callback({ "status": false });
                } else {
                    callback({ "status": true, "url": data.Location });
                }
            });
        } else {
            console.log(error1,"error1")

            callback({ "status": false });
        }
    } catch (err) {
        console.log("Error catched in file upload", err)
        callback({ "status": false });
    }
}
