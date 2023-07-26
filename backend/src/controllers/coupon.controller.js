const { CREATED, OK } = require("../core/success.response");
const { CouponService } = require("../services");
class CouponController {
  static async createCoupon(req, res) {
    new CREATED({
      message: "Create Coupon Successfully",
      metadata: await CouponService.createCoupon(req, res),
    }).send(res);
  }
  static async getAllCoupons(req, res) {
    new OK({
      message: "Get All Coupon Successfully",
      metadata: await CouponService.getAllCoupons(req, res),
    }).send(res);
  }
  static async getCouponById(req, res) {
    new OK({
      message: "Get One Coupon Successfully",
      metadata: await CouponService.getCouponById(req, res),
    }).send(res);
  }
  static async searchCoupons(req, res) {
    new OK({
      message: "Search Coupon Successfully",
      metadata: await CouponService.searchCoupons(req, res),
    }).send(res);
  }
  static async getAllProductsWithCoupon(req, res) {
    new OK({
      message: "Coupon Successfully",
      metadata: "",
    }).send(res);
  }
  static async getAllProductsWithoutCoupon(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async updateCoupon(req, res) {
    new OK({
      message: "Update Coupon Successfully",
      metadata: await CouponService.updateCoupon(req, res),
    }).send(res);
  }
  static async addCouponToProducts(req, res) {
    new OK({
      message: "Add Coupon To Products Successfully",
      metadata: "",
    }).send(res);
  }
  static async addCouponToProductCategories(req, res) {
    new OK({
      message: "Search Coupon To Product Category Successfully",
      metadata: "",
    }).send(res);
  }
  static async deleteCoupon(req, res) {
    new OK({
      message: "Delete Coupon Successfully",
      metadata: await CouponService.deleteCoupon(req, res),
    }).send(res);
  }
  static async deleteAllCouponsExpired(req, res) {
    new OK({
      message: "Delete All Coupon Expired Successfully",
      metadata: await CouponService.deleteAllCouponsExpired(req, res),
    }).send(res);
  }
}

module.exports = CouponController;
