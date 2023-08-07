const { NotFoundError } = require("../core/error.response");
const { DiscountModel } = require("../models");
const {
  getSelectData,
  getUnSelectData,
  skipPage,
  convertSortBy,
} = require("../utils");

class DiscountRepo {
  static async getAllDiscounts({ sort, page = 1, limit = 10, status, filter }) {
    console.log(filter);
    let statusGet = {};
    if (status === "expired")
      statusGet = { discount_endDate: { $lt: Date.now() } };
    if (status === "available")
      statusGet = { discount_endDate: { $gte: Date.now() } };
    const [discounts, totalDiscounts] = await Promise.all([
      DiscountModel.find({ ...filter, ...statusGet })
        .skip(skipPage({ limit, page }))
        .sort(convertSortBy(sort))
        .limit(limit)
        .lean()
        .exec(),
      DiscountModel.countDocuments({ ...filter, ...statusGet }),
    ]);
    return { discounts, totalDiscounts };
  }

  static async getDiscountById({ discountId }) {
    return await DiscountModel.findById(discountId).exec();
  }

  static async searchDiscount({
    sort,
    page,
    limit,
    keySearch,
  }) {
    const regexSearch = new RegExp(keySearch, "i");
    const [discounts, totalDiscounts] = await Promise.all([
      DiscountModel.find({
        $text: {
          $search: regexSearch,
        },
      })
        .skip(skipPage({ limit, page }))
        .sort(convertSortBy(sort))
        .limit(limit)
        .lean()
        .exec(),
      DiscountModel.count(),
    ]);
    return { discounts, totalDiscounts };
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
