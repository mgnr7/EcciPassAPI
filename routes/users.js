const express = require("express");
const {
  userWelcome,
  createUser,
  loginUser,
  recoverPassword,
  resetPassword,
  userProfile,
  profileUpdate,
  profileDelete,
  profileDetails,
} = require("../controllers/users");
const { userIsAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(userWelcome);

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/recover-password").post(recoverPassword);

router.route("/reset-password").patch(resetPassword);

router.route("/user-profile").get([userIsAuthenticated],userProfile);

router.route("/user-profile/:userId").get([userIsAuthenticated],profileDetails);

router.route("/profile-update").patch([userIsAuthenticated], profileUpdate);

router
  .route("/profile-delete/:userId")
  .delete([userIsAuthenticated], profileDelete);

module.exports = router;
