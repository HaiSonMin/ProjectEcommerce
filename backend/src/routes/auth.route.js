const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const {
  localVariables,
  authentication,
  checkAuthIsUser,
  checkAuthIsAdmin,
} = require("../middleware/auth.middleware");

router
  .route("/createSessionRegister")
  .post(localVariables, AuthController.createSessionRegister);
router.route("/confirmRegister").post(AuthController.confirmRegister);

router
  .route("/generateOTPResetPassword")
  .post(localVariables, AuthController.generateOTPResetPassword);
router
  .route("/createSessionResetPassword")
  .post(AuthController.createSessionResetPassword);
router.route("/resetPassword").post(AuthController.resetPassword);

router.route("/login").post(AuthController.login);
router.route("/logout").get(AuthController.logout);
router.route("/refreshAccessToken").post(AuthController.refreshAccessToken);

module.exports = router;
