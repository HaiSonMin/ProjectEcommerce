const { NotFoundError } = require("../core/error.response");
const { DiscountModel } = require("../models");
const {
  getSelectData,
  getUnSelectData,
  skipPage,
  convertSortBy,
} = require("../utils");

class DiscountRepo {
  static async getAllDiscounts({
    sort,
    page = 1,
    limit = 10,
    filter,
    select,
    unSelect,
  }) {
    return await DiscountModel.find(filter)
      .select(getSelectData(select))
      .select(getUnSelectData(unSelect))
      .skip(skipPage({ limit, page }))
      .sort(convertSortBy(sort))
      .limit(limit)
      .lean()
      .exec();
  }


  static async getDiscountById({ discountId }) {
    return await DiscountModel.findById(discountId).exec();
  }

  static async getDiscountsAvailable() {
    return await DiscountModel.find({
      discount_endDate: { $gte: Date.now() },
    });
  }

  static async getDiscountsUnavailable() {
    return await DiscountModel.find({
      discount_endDate: { $lt: Date.now() },
    });
  }

  static async searchDiscount({
    sort,
    page,
    limit,
    select,
    unSelect,
    keySearch,
  }) {
    const regexSearch = new RegExp(keySearch, "i");
    return await DiscountModel.find({
      $text: {
        $search: regexSearch,
      },
    })
      .select(getSelectData(select))
      .select(getUnSelectData(unSelect))
      .skip(skipPage({ limit, page }))
      .sort(convertSortBy(sort))
      .limit(limit)
      .lean()
      .exec();
  }

  static async updateDiscount({ discountId, payload }) {
    return await DiscountModel.findByIdAndUpdate(discountId, payload, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
  }

  static async deleteDiscount({ discountId }) {
    return await DiscountModel.findByIdAndDelete(discountId).lean().exec();
  }

  static async deleteAllDiscountsUnAvailable() {
    return await DiscountModel.deleteMany({
      discount_endDate: { $lt: Date.now() },
    })
      .lean()
      .exec();
  }
}

module.exports = DiscountRepo;
