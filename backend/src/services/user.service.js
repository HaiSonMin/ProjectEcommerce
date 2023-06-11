const { NotFoundError } = require("../core/error.response");
const { UserRepo } = require("../repositories");

class UserService {
  static async updateUser(req, res) {
    const dataUpdate = req.body;
    const { userId } = req.user;
    const userUpdated = await UserRepo.updateUserById({ userId, dataUpdate });
    if (!userUpdated) throw new NotFoundError("Users don't exists");
    return { userUpdated };
  }
}

module.exports = UserService;
