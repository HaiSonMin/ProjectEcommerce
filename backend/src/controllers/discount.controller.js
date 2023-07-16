const { CREATED, OK } = require("../core/success.response");
const { DiscountService } = require("../services");
class DiscountController {
  static async createDiscount(req, res) {
    new CREATED({
      message: "Create Discount Successfully",
      metadata: await DiscountService.createDiscount(req, res),
    }).send(res);
  }

  static async getAllDiscounts(req, res) {
    new OK({
      message: "Get All Discounts Successfully",
      metadata: await DiscountService.getAllDiscounts(req, res),
    }).send(res);
  }

  static async getAllDiscountsPercentage(req, res) {
    new OK({
      message: "Get All Discount Percentage Successfully",
      metadata: await DiscountService.getAllDiscountsPercentage(req, res),
    }).send(res);
  }

  static async getAllDiscountsFixedAmount(req, res) {
    new OK({
      message: "Get All Discounts Fixed Amount Successfully",
      metadata: await DiscountService.getAllDiscountsFixedAmount(req, res),
    }).send(res);
  }

  static async getDiscount(req, res) {
    new OK({
      message: "Get Discount Successfully",
      metadata: await DiscountService.getDiscountById(req, res),
    }).send(res);
  }

  static async getDiscountsAvailable(req, res) {
    new OK({
      message: "Get Discount Available Successfully",
      metadata: await DiscountService.getDiscountsAvailable(req, res),
    }).send(res);
  }

  static async getDiscountsUnavailable(req, res) {
    new OK({
      message: "Get Discount Unavailable Successfully",
      metadata: await DiscountService.getDiscountsUnavailable(req, res),
    }).send(res);
  }

  static async searchDiscount(req, res) {
    new OK({
      message: "Get Discounts By Key Search Successfully",
      metadata: await DiscountService.searchDiscount(req, res),
    }).send(res);
  }

  static async getAllProductsWithDiscount(req, res) {
    new OK({
      message: "Get All Products With Discount Successfully",
      metadata: await DiscountService.getAllProductsWithDiscount(req, res),
    }).send(res);
  }

  static async getAllProductsWithoutDiscount(req, res) {
    new OK({
      message: "Get All Products Without Discount Successfully",
      metadata: await DiscountService.getAllProductsWithoutDiscount(req, res),
    }).send(res);
  }

  static async updateDiscount(req, res) {
    new OK({
      message: "Update Discount Successfully",
      metadata: await DiscountService.updateDiscount(req, res),
    }).send(res);
  }

  static async addDiscountToProducts(req, res) {
    new OK({
      message: "Add Discount To Products Successfully",
      metadata: await DiscountService.addDiscountToProducts(req, res),
    }).send(res);
  }

  static async deleteDiscount(req, res) {
    new OK({
      message: "Delete Discount Successfully",
      metadata: await DiscountService.deleteDiscount(req, res),
    }).send(res);
  }

  static async deleteAllDiscountsUnAvailable(req, res) {
    new OK({
      message: "Delete All Discounts Successfully",
      metadata: await DiscountService.deleteAllDiscountsUnAvailable(req, res),
    }).send(res);
  }
}

module.exports = DiscountController;
