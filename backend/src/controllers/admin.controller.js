const { OK } = require("../core/success.response");
const { AdminService } = require("../services");

class AdminController {
  static async createEmployees(req, res) {
    new OK({
      message: "Create Employees Successfully",
      metadata: await AdminService.createEmployees(req, res),
    }).send(res);
  }

  static async getAllUsers(req, res) {
    new OK({
      message: "Get All Users Successfully",
      metadata: await AdminService.getAllUsers(req, res),
    }).send(res);
  }

  static async getAllUsersIsBlocking(req, res) {
    new OK({
      message: "Get All Users Successfully",
      metadata: await AdminService.getAllUsersIsBlocking(req, res),
    }).send(res);
  }

  static async getUserById(req, res) {
    new OK({
      message: "Get User Successfully",
      metadata: await AdminService.getUserById(req, res),
    }).send(res);
  }

  static async getUsersByEmailOrUserName(req, res) {
    new OK({
      message: "Get All Users Successfully",
      metadata: await AdminService.getUsersByEmailOrUserName(req, res),
    }).send(res);
  }

  static async updateUserById(req, res) {
    new OK({
      message: "Update User Successfully",
      metadata: await AdminService.updateUserById(req, res),
    }).send(res);
  }

  static async blockUserById(req, res) {
    new OK({
      message: "Block User Successfully",
      metadata: await AdminService.blockUserById(req, res),
    }).send(res);
  }
  static async unblockUserById(req, res) {
    new OK({
      message: "Unblock User Successfully",
      metadata: await AdminService.unblockUserById(req, res),
    }).send(res);
  }
  static async deleteUserById(req, res) {
    new OK({
      message: "Delete User Successfully",
      metadata: await AdminService.deleteUserById(req, res),
    }).send(res);
  }
}
module.exports = AdminController;
