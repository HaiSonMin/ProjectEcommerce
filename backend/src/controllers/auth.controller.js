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
  static async generateOTPResetPassword(req, res) {
    new OK({
      message: "Generate OTP reset password successfully",
      metadata: await AuthService.generateOTPResetPassword(req, res),
    }).send(res);
  }
  static async createSessionResetPassword(req, res) {
    new OK({
      message: "Create Session Password successfully",
      metadata: await AuthService.createSessionResetPassword(req, res),
    }).send(res);
  }
  static async resetPassword(req, res) {
    new OK({
      message: "Reset password successfully",
      metadata: await AuthService.resetPassword(req, res),
    }).send(res);
  }
}

module.exports = AuthController;
