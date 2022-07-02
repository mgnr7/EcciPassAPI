const express = require("express");
const { userIsAuthenticated } = require("../middlewares/auth");
const { userDevices } = require("../controllers/devices");

const router = express.Router();

router.route("/user-devices").get([userIsAuthenticated], userDevices);

module.exports = router;
