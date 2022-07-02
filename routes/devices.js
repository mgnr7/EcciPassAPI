const express = require("express");
const { ROLES } = require("../utils/constants");
const { userIsAuthenticated, userIsInRole } = require("../middlewares/auth");
const { userDevices, listDevices } = require("../controllers/devices");

const router = express.Router();

router
  .route("/")
  .get([userIsAuthenticated, userIsInRole([ROLES.ADMIN])], listDevices);
router.route("/user-devices").get([userIsAuthenticated], userDevices);

module.exports = router;
