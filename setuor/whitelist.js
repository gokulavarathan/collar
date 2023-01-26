const whiteListRouter = require("express").Router();

const whiteController = require("../srellortnoc/whitelist");

whiteListRouter.post("/addwhitelist", whiteController.addwhitelist);

whiteListRouter.get("/listwhitelist", whiteController.findWhiteList)

whiteListRouter.post("/removewhitelist", whiteController.removeWhiteList)

module.exports = whiteListRouter;