const express = require("express");
const router = express.Router();

var controller = require("../controllers/home.controller");

router.get("/",  controller.index);

module.exports = router;