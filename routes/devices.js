const express = require("express");
const { ROLES } = require("../utils/constants");
const { userIsAuthenticated, userIsInRole } = require("../middlewares/auth");
const {
  createDevice,
  userDevices,
  listDevices,
  deviceDetails,
  deviceDelete,
  deviceUpdateStatus,
} = require("../controllers/devices");

const router = express.Router();

router
  .route("/")
  .get([userIsAuthenticated, userIsInRole([ROLES.ADMIN])], listDevices);
router.route("/user-devices").get([userIsAuthenticated], userDevices);
router
  .route("/device-details/:deviceId")
  .get([userIsAuthenticated], deviceDetails);
router
  .route("/device-delete/:deviceId")
  .delete([userIsAuthenticated], deviceDelete);
router
  .route("/device-status-update/:deviceId")
  .patch([userIsAuthenticated], deviceUpdateStatus);
//router.route("/register-device").post([userIsAuthenticated], createDevice);

module.exports = router;
