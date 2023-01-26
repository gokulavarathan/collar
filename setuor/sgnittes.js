const express = require('express');
const router = express.Router();

const common = require('../srepleh/nommoc');
const validation = require('../srepleh/noitadilav');

const siteController = require('../srellortnoc/sgnittes');

//create site settings
router.post('/createSiteDetails', siteController.createSiteDetails);

//get sitesettings
router.get('/getSiteDetails', siteController.getSiteDetails);
//update sitesettings
router.post('/updateSiteDetails', common.tokenMiddlewareAdmin, siteController.updateSiteDetails);
//cms
router.get('/getcms', common.tokenMiddlewareAdmin, siteController.getcms);
//single cms
router.post('/singlecms', common.tokenMiddlewareAdmin, validation.postValidation, siteController.singlecms);
//edit cms
router.post('/editcms', common.tokenMiddlewareAdmin, siteController.editcms);

module.exports = router;