const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const {
  localVariables,
  authentication,
  checkAuthIsUser,
  checkAuthIsAdmin,
} = require("../middleware/auth.middleware");
const passport = require("passport");

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
    successRedirect: `${process.env.LOCAL_HOST_CLIENT}/login/success`,
  })
);

router.route("/logout").get(AuthController.logout);
router.route("/refreshAccessToken").post(AuthController.refreshAccessToken);
router.route("/user").get(authentication,AuthController.haveAuth)


module.exports = router;
