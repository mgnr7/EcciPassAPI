const express = require("express");
const {
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
} = require("../controllers/users");

const router = express.Router();

router.route.post(createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch(resetPassword);

module.exports = router;
