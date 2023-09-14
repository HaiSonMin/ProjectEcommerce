const { UserModel } = require("../models");
const { getUnSelectData } = require("../utils");

class UserRepository {
  static async getUserById({ userId }) {
    return await UserModel.findById(userId).exec();
  }

  static async getUserByEmail({ user_email }) {
    return await UserModel.findOne({ user_email })
      .select("+user_password")
      .exec();
  }

  static async updateUserById({ userId, dataUpdate }) {
    return await UserModel.findByIdAndUpdate(userId, dataUpdate, {
      new: true,
    }).select(getUnSelectData(["__v"]));
  }

  static async matchSecretToken(encodeSecretToken) {
    return await UserModel.findOne({
      user_passwordResetSecretKey: encodeSecretToken,
      user_passwordResetExpires: { $gt: Date.now() },
    });
  }
}

module.exports = UserRepository;
