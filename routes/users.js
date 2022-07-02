const express = require("express");
const {
  userWelcome,
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
  userProfile,
  userHelp,
} = require("../controllers/users");
const { userIsAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(userWelcome);

router.route("/").post(createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch(resetPassword);

router.route("/profile").get([userIsAuthenticated], userProfile);

module.exports = router;
