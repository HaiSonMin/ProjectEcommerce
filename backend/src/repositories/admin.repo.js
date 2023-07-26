const { convertObjectIdMongo, skipPage, convertSortBy } = require("../utils");
const { UserModel } = require("../models");
const { getSelectData, getUnSelectData } = require("../utils/index");

class AdminRepository {
  static async getAllUsers({ sort, page = 1, limit = 10, status, keySearch }) {
    let statusGet = {};
    if (status === "blocking") statusGet = { user_isBlocking: true };
    if (status === "unBlocking") statusGet = { user_isBlocking: false };
    const [users, totalUsers] = await Promise.all([
      UserModel.find({ ...statusGet })
        .skip(skipPage({ limit, page }))
        .sort(convertSortBy(sort))
        .limit(limit)
        .lean()
        .exec(),
      UserModel.countDocuments({ ...statusGet }),
    ]);
    return { users, totalUsers };
  }

  static async getUserById({ userId, select }) {
    return await UserModel.findById(convertObjectIdMongo(userId))
      .select(getSelectData(select))
      .lean()
      .exec();
  }

  static async searchUser({ keySearch, page = 1, limit = 10, sort }) {
    const regexSearch = new RegExp(keySearch, "i");

    const [users, totalUsers] = await Promise.all([
      UserModel.find({
        $text: { $search: regexSearch },
      })
        .sort({ score: { $meta: "textScore" }, ...convertSortBy(sort) })
        .skip(skipPage({ page, limit }))
        .limit(limit)
        .lean()
        .exec(),
      UserModel.countDocuments({ $text: { $search: regexSearch } }),
    ]);

    return { users, totalUsers };
  }

  static async updateUserById({ userId, payload }) {
    return await UserModel.findByIdAndUpdate(userId, payload, { new: true }).exec();
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
    return await UserModel.findByIdAndDelete(userId).lean().exec();
  }
}

module.exports = AdminRepository;
