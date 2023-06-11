const { NotFoundError } = require("../core/error.response");
const { AdminRepo } = require("../repositories");

class AdminService {
  static async getAllUsers(req, res) {
    const selectField = ["user_userName", "user_email", "user_address"];
    const filter = {
      user_role: "USER",
      user_isBlocking: false,
    };
    const users = await AdminRepo.getAllUsers({ filter, select: selectField });
    if (!users.length) throw new NotFoundError("Users don't exists");
    return { users };
  }

  static async getAllUsersIsBlocking(req, res) {
    const selectField = ["user_userName", "user_email", "user_address"];
    const filter = {
      user_role: "USER",
      user_isBlocking: true,
    };
    const users = await AdminRepo.getAllUsers({ filter, select: selectField });
    if (!users.length) throw new NotFoundError("Users don't exists");
    return { users };
  }

  static async getUserById(req, res) {
    const selectField = ["user_userName", "user_email"];
    const { userId } = req.params;
    const user = await AdminRepo.getUserById({ userId, select: selectField });
    if (!user) throw new NotFoundError("User doesn't exist");
    return { user };
  }

  static async getUsersByEmailOrUserName(req, res) {
    const selectField = ["user_userName", "user_email"];
    const { keySearch } = req.body;
    console.log("keySearch::::", keySearch);
    const searchUsers = await AdminRepo.getUsersByEmailOrUserName({
      keySearch,
      select: selectField,
    });
    if (!searchUsers) throw new NotFoundError("Users don't exists");
    return { searchUsers };
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
    return { userDeleted };
  }
}

module.exports = AdminService;
