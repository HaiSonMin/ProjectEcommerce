const { CREATED, OK } = require("../core/success.response");
const { ProductServiceV2 } = require("../services");
class ProductController {
  static async createProduct(req, res) {
    new CREATED({
      message: "Create Product Successfully",
      metadata: await ProductServiceV2.createProduct(req, res),
    }).send(res);
  }

  static async getAllProducts(req, res) {
    new OK({
      message: "Get All Product Successfully",
      metadata: await ProductServiceV2.getAllProducts(req, res),
    }).send(res);
  }

  static async getProductById(req, res) {
    new OK({
      message: "Get Product By Id Successfully",
      metadata: await ProductServiceV2.getProductById(req, res),
    }).send(res);
  }

  static async getProductByNameOrDescription(req, res) {
    new OK({
      message: "Get Product By Name Or Description Successfully",
      metadata: await ProductServiceV2.getProductByNameOrDescription(req, res),
    }).send(res);
  }

  static async updateProductBasic(req, res) {
    new OK({
      message: "Update Product By Id Successfully",
      metadata: await ProductServiceV2.updateProductBasic(req, res),
    }).send(res);
  }

  static async updateProductAttribute(req, res) {
    new OK({
      message: "Update Product Attribute Successfully",
      metadata: await ProductServiceV2.updateProductAttribute(req, res),
    }).send(res);
  }

  static async provideAttributeProduct(req, res) {
    new OK({
      message: "Provide Attribute Product By Id Successfully",
      metadata: await ProductServiceV2.provideAttributeProduct(req, res),
    }).send(res);
  }

  static async deleteProductById(req, res) {
    new OK({
      message: "Delete Product By Id Successfully",
      metadata: await ProductServiceV2.deleteProductById(req, res),
    }).send(res);
  }

  static async deleteProductAttribute(req, res) {
    new OK({
      message: "Delete Product Main Info Successfully",
      metadata: await ProductServiceV2.deleteProductAttribute(req, res),
    }).send(res);
  }
}

module.exports = ProductController;
