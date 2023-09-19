const { NotFoundError, BadRequestError } = require("../core/error.response");
const { UserModel } = require("../models");
const { AdminRepo, KeyTokenRepo } = require("../repositories");
const { getInfoData } = require("../utils");

class AdminService {
  // WRITER, READER
  static async createEmployees(req, res) {
    const payload = req.body;
    if (payload.user_password !== payload.reconfirmPassword)
      throw new BadRequestError("Password and reconfirmPassword don't match");

    const newUser = await UserModel.create(payload);

    if (!newUser)
      throw new BadRequestError("Some thing went wrong when you create");

    return getInfoData(newUser, [
      "user_firstName",
      "user_lastName",
      "user_userName",
      "user_email",
      "user_phoneNumber",
      "user_role",
    ]);
  }

  static async getAllUsers(req, res) {
    const { sort, page, limit, status, fields, keySearch } = req.query;
    const { users, totalUsers } = await AdminRepo.getAllUsers({
      sort,
      page,
      limit,
      status,
      keySearch,
    });
    return {
      totalUsers,
      usersPerPage: users.length,
      users,
    };
  }

  static async getUserById(req, res) {
    const selectField = ["user_userName", "user_email"];
    const { userId } = req.params;
    const user = await AdminRepo.getUserById({ userId, select: selectField });
    if (!user) throw new NotFoundError("User doesn't exist");
    return { user };
  }

  static async getUsersByEmailOrUserName(req, res) {
    const { keySearch, page, limit } = req.query;
    console.log("keySearch::::", keySearch);
    const { totalUsers, users } = await AdminRepo.searchUser({
      keySearch,
      limit,
      page,
    });
    return { totalUsers, usersPerPage: users.length, users };
  }

  static async updateUserById(req, res) {
    const { userId } = req.params;
    const payload = req.body;
    const userUpdated = await AdminRepo.updateUserById({ userId, payload });
    if (!userUpdated) throw new NotFoundError("Users don't exists");
    return userUpdated;
  }

  static async blockUserById(req, res) {
    const { userId } = req.params;
    const userBlocked = await AdminRepo.blockUserById({ userId });
    if (!userBlocked) throw new NotFoundError("Users don't exists");
    return { userBlocked };
  }

  static async unblockUserById(req, res) {
    const { userId } = req.params;
    const userUnblocked = await AdminRepo.unblockUserById({ userId });
    if (!userUnblocked) throw new NotFoundError("Users don't exists");
    return { userUnblocked };
  }

  static async deleteUserById(req, res) {
    const { userId } = req.params;

    const userDeleted = await AdminRepo.deleteUserById({ userId });
    if (!userDeleted) throw new NotFoundError("Users don't exists");

    await KeyTokenRepo.deleteTokenByUserId(userId);

    return { userDeleted };
  }
}

module.exports = AdminService;
