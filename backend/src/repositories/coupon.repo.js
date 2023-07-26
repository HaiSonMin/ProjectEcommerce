const { CouponModel } = require("../models");
const { skipPage, convertSortBy } = require("../utils");

class CouponRepo {
  static async getAllCoupons({ sort, limit = 10, page = 1, status, filter }) {
    let statusGet = {};
    if (status === "expired")
      statusGet = { discount_endDate: { $lt: Date.now() } };
    if (status === "available")
      statusGet = { discount_endDate: { $gte: Date.now() } };

    const [coupons, totalCoupons] = await Promise.all([
      CouponModel.find({ ...statusGet, ...filter })
        .limit(limit)
        .sort(convertSortBy(sort))
        .skip(skipPage({ limit, page }))
        .lean()
        .exec(),

      CouponModel.countDocuments({ ...statusGet, ...filter }),
    ]);

    return { coupons, totalCoupons };
  }

  static async getCouponById({ couponId }) {
    return await CouponModel.findById(couponId).exec();
  }

  static async searchCoupons({ sort, page = 1, limit = 10, keySearch }) {
    const regexSearch = new RegExp(keySearch, "i");
    const [coupons, totalCoupons] = await Promise.all([
      CouponModel.find({
        $text: {
          $search: regexSearch,
        },
      })
        .skip(skipPage({ limit, page }))
        .sort(convertSortBy(sort))
        .limit(limit)
        .lean()
        .exec(),
      CouponModel.countDocuments({
        $text: {
          $search: regexSearch,
        },
      }),
    ]);
    return { coupons, totalCoupons };
  }

  static async updateCoupon({ couponId, payload }) {
    return await CouponModel.findByIdAndUpdate(couponId, payload, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
  }

  static async deleteCoupon({ couponId }) {
    return await CouponModel.findByIdAndDelete(couponId).lean().exec();
  }

  static async deleteAllCouponsExpired() {
    return await CouponModel.deleteMany({
      coupon_endDate: { $lt: Date.now() },
    })
      .lean()
      .exec();
  }
}

module.exports = CouponRepo;
