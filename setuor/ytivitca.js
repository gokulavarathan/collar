const express = require('express');
const router = express.Router();


const validation = require('../srepleh/noitadilav');

const activityController = require("../srellortnoc/ytivitca");

//posting activity
router.post("/postactivity", validation.postValidation, activityController.addActivity)

//listactivity
router.get("/getuseractivity/:userAddress", activityController.listActivity)


//postscholarship
router.post("/scholarship", activityController.schloarship)

router.get("/getScholarship", activityController.getScholarShip)





module.exports = router;