const { OK } = require("../core/success.response");
const { CartService } = require("../services");
class CartController {
  static async getAllProducts(req, res) {
    new OK({
      message: "Get All Products In Cart Successfully",
      metadata: await CartService.getAllProductsByUserId(req, res),
    }).send(res);
  }

  static async addProductToCart(req, res) {
    new OK({
      message: "Add Product To Cart Successfully",
      metadata: await CartService.addProductToCart(req, res),
    }).send(res);
  }

  static async updateCart(req, res) {
    new OK({
      message: "Update Cart Successfully",
      metadata: await CartService.updateCart(req, res),
    }).send(res);
  }

  static async deleteProduct(req, res) {
    new OK({
      message: "Update Cart Successfully",
      metadata: await CartService.deleteProduct(req, res),
    }).send(res);
  }

  static async deleteAllProduct(req, res) {
    new OK({
      message: "Update Cart Successfully",
      metadata: await CartService.deleteAllProducts(req, res),
    }).send(res);
  }
}

module.exports = CartController;
