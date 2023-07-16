const { RatingModel } = require("../models");
const {
  getSelectData,
  getUnSelectData,
  skipPage,
  convertSortBy,
} = require("../utils");

class RatingRepo {
  static async getRatingsByProductId({
    filter,
    page,
    limit,
    sort = "ctime",
    select,
    unSelect,
  }) {
    return await RatingModel.find(filter)
      .skip(skipPage({ page, limit }))
      .limit(limit)
      .select(getSelectData(select))
      .select(getUnSelectData(unSelect))
      .sort(convertSortBy(sort))
      .lean()
      .exec();
  }

  static async updateRatingById({ ratingId, payload }) {
    return await RatingModel.findByIdAndUpdate(ratingId, payload, {
      new: true,
    });
  }

  static async deleteRatingById({ ratingId }) {
    return await RatingModel.findByIdAndDelete(ratingId);
  }
}

module.exports = RatingRepo;
