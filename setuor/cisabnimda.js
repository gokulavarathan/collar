const express = require('express');
const router = express.Router();

const validation = require('../srepleh/noitadilav');

const basicController = require('../srellortnoc/cisabnimda');

//whitelist
router.get('/addWhitelist', basicController.addWhitelist);
router.post('/addWhitelistManual', validation.postValidation, basicController.addWhitelistManual);
router.get('/listWhitelist', basicController.listWhitelist);
router.post('/deleteWhitelist', validation.postValidation, basicController.deleteWhitelist);
router.get('/checkWhitelist', basicController.checkWhitelist);

//blocklist
router.post('/addBlocklist', validation.postValidation, basicController.addBlocklist);
router.get('/listBlocklist', basicController.listBlocklist);
router.post('/deleteBlocklist', validation.postValidation, basicController.deleteBlocklist);
router.get('/checkBlocklist', basicController.checkBlocklist);

//basic
router.post('/login', validation.postValidation, basicController.login);
router.post('/setCheck', basicController.setCheck);
router.post('/getCheckdata', basicController.getCheckdata);

module.exports = router;