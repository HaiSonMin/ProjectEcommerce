const { NotFoundError, BadRequestError } = require("../core/error.response");
const { UserRepo } = require("../repositories");

class UserService {
  static async checkUser(req, res) {
    const { user_email } = req.body;
    const user = await UserRepo.getUserByEmailNoInfoSecret({ user_email });
    if (!user) throw new NotFoundError("Users don't exists");
    return user;
  }
  static async updateUser(req, res) {
    const dataUpdate = req.body;
    const { userId } = req.user;
    const userUpdated = await UserRepo.updateUserById({ userId, dataUpdate });
    if (!userUpdated) throw new NotFoundError("Users don't exists");
    return { userUpdated };
  }
}

module.exports = UserService;
