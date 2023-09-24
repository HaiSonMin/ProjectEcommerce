const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const {
  logout,
  checkAuth,
  authentication,
  validationCaptcha,
} = require("../middleware/auth.middleware");
const passport = require("passport");

router
  .route("/generateOTP")
  .post(validationCaptcha, AuthController.generateOTP);

router
  .route("/createSessionRegister")
  .post(validationCaptcha, AuthController.createSessionRegister);

router.route("/confirmRegister").post(AuthController.confirmRegister);

router
  .route("/createSessionResetPassword")
  .post(AuthController.createSessionResetPassword);

router
  .route("/confirmOTPResetPassword")
  .post(AuthController.confirmOTPResetPassword);

router.route("/confirmResetPassword").post(AuthController.confirmResetPassword);

router.route("/login/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent", // Popup every time i click login gg
  })
);

router.route("/login/google/callback").get(
  passport.authenticate("google", {
    failureMessage: "Login failed, please try again later",
    successRedirect: `${process.env.LOCAL_HOST_CLIENT}/login/success/google`,
  })
);

router.route("/login/success/google").get(AuthController.loginSuccessGoogle);

router.route("/login").post(AuthController.login);
// router.route("/login").post(validationCaptcha, AuthController.login);

router.route("/logout").get(AuthController.logout);

router.route("/refreshAccessToken").get(AuthController.refreshAccessToken);

router.route("/user").get(authentication, AuthController.haveAuth);

router.route("/generateOTP").get(AuthController.generateOTP);

module.exports = router;
