const { CREATED, OK } = require("../core/success.response");
const { WishlistService } = require("../services");
class WishlistController {
  static async addProduct(req, res) {
    new CREATED({
      message: "Create wishlist Successfully",
      metadata: await WishlistService.addProduct(req, res),
    }).send(res);
  }
  static async getAllProducts(req, res) {
    new OK({
      message: "Get All Products In Wishlist Successfully",
      metadata: await WishlistService.getAllProducts(req, res),
    }).send(res);
  }
  static async deleteProduct(req, res) {
    new OK({
      message: "Delete Product In Wishlist Successfully",
      metadata: await WishlistService.deleteProductById(req, res),
    }).send(res);
  }
  static async deleteAllProducts(req, res) {
    new OK({
      message: "Delete All Products In Wishlist Successfully",
      metadata: await WishlistService.deleteAllProducts(req, res),
    }).send(res);
  }
}

module.exports = WishlistController;
