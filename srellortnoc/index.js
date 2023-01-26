const encryption = require('../srepleh/noitpyrcne');

const socket_config = require("../srepleh/tekcos");

exports.samplecheck = (req, res) => {

    //socket_config.sendmessage("sendmessage","sendmessage")
    res.json({ "status": true, "message": "success" })
}

