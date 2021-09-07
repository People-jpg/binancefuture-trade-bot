const express = require("express");
const router = express.Router();

var controller = require("../controllers/user.controller");


router.get("/", controller.index);
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;