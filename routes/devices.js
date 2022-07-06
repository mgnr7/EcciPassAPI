const express = require("express");
const { ROLES } = require("../utils/constants");
const { userIsAuthenticated, userIsInRole } = require("../middlewares/auth");
const {
  userDevices,
  listDevices,
  deviceDetails,
  deviceDelete,
  deviceUpdateStatus,
  registerDevice,
} = require("../controllers/devices");

const router = express.Router();

router
  .route("/")
  .get([userIsAuthenticated, userIsInRole([ROLES.ADMIN])], listDevices);
router.route("/user-devices").get([userIsAuthenticated], userDevices);
router.route("/device-details").post([userIsAuthenticated], deviceDetails);
router.route("/device-delete").delete([userIsAuthenticated], deviceDelete);
router
  .route("/device-status-update")
  .patch([userIsAuthenticated], deviceUpdateStatus);
router.route("/register-device").post([userIsAuthenticated], registerDevice);

module.exports = router;
