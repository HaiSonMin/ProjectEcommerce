const { CREATED, OK } = require("../core/success.response");
const { UserService } = require("../services/index");
class UserController {
  static async getUser(req, res) {
    new OK({
      message: "Check User successfully",
      metadata: await UserService.getUser(req, res),
    }).send(res);
  }
  static async updateUser(req, res) {
    new OK({
      message: "Register successfully",
      metadata: await UserService.updateUser(req, res),
    }).send(res);
  }
}

module.exports = UserController;
