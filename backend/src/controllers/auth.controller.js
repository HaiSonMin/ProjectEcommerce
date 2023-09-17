const { CREATED, OK } = require("../core/success.response");
const { AuthService } = require("../services/index");
class AuthController {
  static async createResetPasswordSession(req, res) {
    new OK({
      message: "Verify session reset password successfully",
      metadata: await AuthService.createResetPasswordSession(req, res),
    }).send(res);
  }
  static async registerUser(req, res) {
    new OK({
      message: "Register User",
      metadata: await AuthService.register(req, res),
    }).send(res);
  }
  static async confirmRegisterUser(req, res) {
    new OK({
      message: "Register User successfully",
      metadata: await AuthService.confirmRegisterUser(req, res),
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
  static async forgotPassword(req, res) {
    new OK({
      message: "ForgotPassword",
      metadata: await AuthService.forgotPassword(req, res),
    }).send(res);
  }
  static async resetPassword(req, res) {
    new OK({
      message: "ResetPassword successfully",
      metadata: await AuthService.resetPassword(req, res),
    }).send(res);
  }
  static async autoDeleteSessionAuthExpired(req, res) {
    new OK({
      message: "Auto Delete",
      metadata: await AuthService.autoDeleteSessionAuthExpired(req, res),
    }).send(res);
  }
}

module.exports = AuthController;
