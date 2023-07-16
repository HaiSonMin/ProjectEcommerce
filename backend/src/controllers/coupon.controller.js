const { CREATED, OK } = require("../core/success.response");
const { CouponService } = require("../services");
class CouponController {
  static async createCoupon(req, res) {
    new CREATED({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async getAllCoupons(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async getCoupon(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async searchCoupon(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async getAllProductsWithCoupon(req, res) {
    new OK({
      message: "",
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
      message: "",
      metadata: "",
    }).send(res);
  }
  static async addCouponToProducts(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async addCouponToProductCategories(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async deleteCoupon(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
  static async deleteAllCoupons(req, res) {
    new OK({
      message: "",
      metadata: "",
    }).send(res);
  }
}

module.exports = CouponController;
