const { CREATED, OK } = require("../core/success.response");
const { AuthService } = require("../services/index");
class AuthController {
  static async createSessionRegister(req, res) {
    new OK({
      message: "Generate session register successfully",
      metadata: await AuthService.createSessionRegister(req, res),
    }).send(res);
  }
  static async confirmRegister(req, res) {
    new OK({
      message: "Register User successfully",
      metadata: await AuthService.confirmRegister(req, res),
    }).send(res);
  }
  static async haveAuth(req, res) {
    new OK({
      message: "User have auth",
      metadata: await AuthService.haveAuth(req, res),
    }).send(res);
  }
  static async loginSuccessGoogle(req, res) {
    new OK({
      message: "Login google successfully",
      metadata: await AuthService.loginSuccessGoogle(req, res),
    }).send(res);
  }
  static async login(req, res) {
    new OK({
      message: "Login successfully",
      metadata: await AuthService.login(req, res),
    }).send(res);
  }
  static async logout(req, res) {
    new OK({
      message: "Logout successfully",
      metadata: await AuthService.logout(req, res),
    }).send(res);
  }
  static async refreshAccessToken(req, res) {
    new OK({
      message: "RefreshAccessToken successfully",
      metadata: await AuthService.refreshAccessToken(req, res),
    }).send(res);
  }
  static async generateOTP(req, res) {
    new OK({
      message: "Generate OTP successfully",
      metadata: await AuthService.generateOTP(req, res),
    }).send(res);
  }
  static async createSessionResetPassword(req, res) {
    new OK({
      message: "Create Session Password successfully",
      metadata: await AuthService.createSessionResetPassword(req, res),
    }).send(res);
  }
  static async confirmOTPResetPassword(req, res) {
    new OK({
      message: "Create Session Password successfully",
      metadata: await AuthService.confirmOTPResetPassword(req, res),
    }).send(res);
  }
  static async confirmResetPassword(req, res) {
    new OK({
      message: "Reset password successfully",
      metadata: await AuthService.confirmResetPassword(req, res),
    }).send(res);
  }
  static async generateOTP(req, res) {
    new OK({
      message: "Resend OTP successfully",
      metadata: await AuthService.generateOTP(req, res),
    }).send(res);
  }
}

module.exports = AuthController;
