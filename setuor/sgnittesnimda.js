const express = require('express');
const router = express.Router();

const common = require('../srepleh/nommoc');
const validation = require('../srepleh/noitadilav');

const settingsController = require('../srellortnoc/sgnittesnimda');

//tfa
router.post('/tfasetup', common.tokenMiddlewareAdmin, validation.postValidation, settingsController.tfasetup);
//change password
router.post('/changePassword', common.tokenMiddlewareAdmin, validation.postValidation, settingsController.changePassword);
//change pattern
router.post('/changePattern', common.tokenMiddlewareAdmin, validation.postValidation, settingsController.changePattern);
//get profile
router.get('/getProfile', common.tokenMiddlewareAdmin, settingsController.getProfile);
//update profile
router.post('/updateProfile', common.tokenMiddlewareAdmin, settingsController.updateProfile);

module.exports = router;