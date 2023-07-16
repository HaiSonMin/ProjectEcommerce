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

  static async getAllProductsAvailable(req, res) {
    new OK({
      message: "Get All Product Available Successfully",
      metadata: await ProductService.getAllProductsAvailable(req, res),
    }).send(res);
  }

  static async getAllProductsUnavailable(req, res) {
    new OK({
      message: "Get All Product Unavailable Successfully",
      metadata: await ProductService.getAllProductsUnavailable(req, res),
    }).send(res);
  }

  static async getProductById(req, res) {
    new OK({
      message: "Get Product By Id Successfully",
      metadata: await ProductService.getProductById(req, res),
    }).send(res);
  }

  static async getProductByNameOrDescription(req, res) {
    new OK({
      message: "Get Product By Name Or Description Successfully",
      metadata: await ProductService.getProductByNameOrDescription(req, res),
    }).send(res);
  }

  static async updateProductById(req, res) {
    new OK({
      message: "Update Product By Id Successfully",
      metadata: await ProductService.updateProductById(req, res),
    }).send(res);
  }

  static async provideInfoProductById(req, res) {
    new OK({
      message: "Provide Info Product By Id Successfully",
      metadata: await ProductService.provideInfoProductById(req, res),
    }).send(res);
  }

  static async deleteProductById(req, res) {
    new OK({
      message: "Delete Product By Id Successfully",
      metadata: await ProductService.deleteProductById(req, res),
    }).send(res);
  }
}

module.exports = ProductController;
