const { convertObjectIdMongo } = require("../utils");
const { UserModel } = require("../models");
const { getSelectData, getUnSelectData } = require("../utils/index");

class AdminRepository {
  static async getAllUsers({ filter, page = 1, limit = 10, select }) {
    const skip = (page - 1) * limit;
    return await UserModel.find(filter)
      .select(getSelectData(select))
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  static async getUserById({ userId, select }) {
    return await UserModel.findById(convertObjectIdMongo(userId))
      .select(getSelectData(select))
      .lean()
      .exec();
  }

  static async getUsersByEmailOrUserName({
    keySearch,
    page = 1,
    limit = 10,
    select,
  }) {
    const skip = (page - 1) * limit;
    const regexSearch = new RegExp(keySearch, "i");

    return await UserModel.find(
      {
        user_role: "USER",
        $text: { $search: regexSearch },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .select(getSelectData(select))
      .select(getUnSelectData(["score"]))
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  static async blockUserById({ userId }) {
    return await UserModel.findByIdAndUpdate(
      convertObjectIdMongo(userId),
      {
        $set: {
          user_isBlocking: true,
        },
      },
      { new: true }
    )
      .lean()
      .exec();
  }

  static async unblockUserById({ userId }) {
    return await UserModel.findByIdAndUpdate(
      convertObjectIdMongo(userId),
      {
        $set: {
          user_isBlocking: false,
        },
      },
      { new: true }
    )
      .lean()
      .exec();
  }

  static async deleteUserById({ userId }) {
    return await UserModel.findByIdAndDelete(convertObjectIdMongo(userId))
      .lean()
      .exec();
  }
}

module.exports = AdminRepository;
