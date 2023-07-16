const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");

router.route("/register").post(AuthController.registerUser);
router.route("/login").post(AuthController.login);
router.route("/logout").post(AuthController.logout);
router.route("/refreshAccessToken").post(AuthController.refreshAccessToken);
router.route("/resetPassword").get(AuthController.forgotPassword);
router.route("/resetPassword/:secretToken").post(AuthController.resetPassword);

module.exports = router;
