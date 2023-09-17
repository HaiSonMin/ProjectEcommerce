const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const {
  authentication,
  checkAuthIsUser,
  checkAuthIsAdmin,
} = require("../middleware/auth.middleware");

router.route("/register").post(AuthController.registerUser);
router.route("/confirmRegister").post(AuthController.confirmRegisterUser);
router.route("/login").post(AuthController.login);
router.route("/forgotPassword").post(AuthController.forgotPassword);
router
  .route("/resetPasswordSession")
  .post(AuthController.createResetPasswordSession);
router.route("/resetPassword").post(AuthController.resetPassword);
router.route("/logout").get(AuthController.logout);
router.route("/refreshAccessToken").post(AuthController.refreshAccessToken);

module.exports = router;
