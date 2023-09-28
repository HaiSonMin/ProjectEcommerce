const { CREATED, OK } = require("../core/success.response");
const { ProductService } = require("../services");
class ProductController {
  static async createProduct(req, res) {
    new CREATED({
      message: "Create Product Successfully",
      metadata: await ProductService.createProduct(req, res),
    }).send(res);
  }

  static async getAllProducts(req, res) {
    new OK({
      message: "Get All Product Successfully",
      metadata: await ProductService.getAllProducts(req, res),
    }).send(res);
  }

  static async getProductById(req, res) {
    new OK({
      message: "Get Product Successfully",
      metadata: await ProductService.getProductById(req, res),
    }).send(res);
  }

  static async getProductByCategoryId(req, res) {
    new OK({
      message: "Get product by category id successfully",
      metadata: await ProductService.getProductByCategoryId(req, res),
    }).send(res);
  }

  static async updateProduct(req, res) {
    new OK({
      message: "Update product Successfully",
      metadata: await ProductService.updateProduct(req, res),
    }).send(res);
  }

  static async searchProduct(req, res) {
    new OK({
      message: "Search product Successfully",
      metadata: await ProductService.searchProduct(req, res),
    }).send(res);
  }

  static async deleteProduct(req, res) {
    new OK({
      message: "Delete Product Successfully",
      metadata: await ProductService.deleteProduct(req, res),
    }).send(res);
  }
}

module.exports = ProductController;
