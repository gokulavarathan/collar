const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });

const validation = require('../srepleh/noitadilav');

const tokenController = require('../srellortnoc/nekot');

//create token
router.post('/createToken', upload.single('file'), validation.postValidation, tokenController.createToken);
//order table
router.post('/createOrder', validation.postValidation, tokenController.createOrder);
//get token list 
router.post('/getTokenList/:address', tokenController.getTokenList);
//get single token
router.post('/getSingleToken/:id', tokenController.getSingleToken);
//get order list
router.post('/getOrderList/:address', tokenController.getOrderList);
//breed request
router.post('/createBreed', validation.postValidation, tokenController.createBreed);
//get breed request
router.get('/getBreedRequest', tokenController.getBreedRequest);
//breed status change
router.post('/breedStatusChange', validation.postValidation, tokenController.breedStatusChange);
//dashboard
router.post('/dashboard', validation.postValidation, tokenController.dashboard);
//create profile
router.post('/createProfile', upload.single('file'), validation.postValidation, tokenController.createProfile)
//get profile details
router.get('/getProfileDetails/:userAddress', tokenController.getProfileDetails)

//update user profile
router.post("/updateprofile", upload.single('file'), tokenController.updateProfileDetails);

//create multiple tokens
router.post("/createMultipleTokens", upload.single('file'), validation.postValidation, tokenController.createMultipleToken)

router.post("/fileUpload",upload.single('file'),tokenController.fileUpload)
module.exports = router;