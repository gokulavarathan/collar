const express = require('express');
const router = express.Router();

const encryption = require('../srepleh/noitpyrcne');

const indexController = require('../srellortnoc/index');

router.post('/enc', (req, res) => {
    const common = require('../srepleh/nommoc');
    const result = common.decrypt(req.body.value)

res.json(({status:true,result:result}))
})

router.get('/sample', indexController.samplecheck);



module.exports = router;
