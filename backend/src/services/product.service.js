const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductModel } = require("../models");
const { ProductRepo } = require("../repositories");
const {
  convertOperatorObject,
  getOptionOperator,
  excludeFields,
  convertSortBy,
} = require("../utils");
class ProductService {
  static async createProduct(req, res) {
    const payload = req.body;
    const newProduct = await ProductModel.create(payload);
    if (!newProduct) throw new BadRequestError("Create Product Error");
    return newProduct;
  }
  static async getAllProducts(req, res) {
    const queries = req.query;
    const { sort, limit, page, filter, numericFilters } = queries;
    console.log("numericFilters:::", JSON.stringify(numericFilters));
    // excludeFields().forEach((el) => delete queries[el]);
    const operatorFilter = convertOperatorObject({
      numericFilters,
      option: getOptionOperator([
        "product_price",
        "product_quantity",
        "product_sold",
      ]),
    });
    const products = await ProductRepo.getAllProducts({
      filter: { ...operatorFilter, ...filter },
      sort,
      limit,
      page,
    });
    if (!products.length) throw new NotFoundError("Product don't exists");
    return {
      productsQuantity: products.length,
      products,
    };
  }
  static async getAllProductsAvailable(req, res) {
    const filter = {
      product_quantity: { $gt: 0 },
    };
    const products = await ProductRepo.getAllProducts({
      filter,
      sort: "ctime",
    });
    if (!products.length) throw new NotFoundError("Product don't exists");
    return {
      productsQuantity: products.length,
      products,
    };
  }
  static async getAllProductsUnavailable(req, res) {
    const filter = {
      product_quantity: { $lte: 0 },
    };
    const products = await ProductRepo.getAllProducts({
      filter,
      sort: "ctime",
    });
    if (!products.length) throw new NotFoundError("Product don't exists");
    return {
      productsQuantity: products.length,
      products,
    };
  }
  static async getProductById(req, res) {
    const { productId } = req.params;
    const product = await ProductRepo.getProductById({ productId });
    if (!product) throw new NotFoundError("Product doesn't exists");
    return { product };
  }
  static async getProductByNameOrDescription(req, res) {
    const { keySearch } = req.body;
    const products = await ProductRepo.getProductByNameOrDescription({
      keySearch,
    });
    if (!products.length) throw new NotFoundError("Product don't exists");
    return { products };
  }

  static async updateProductById(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    console.log("productId::::", productId);
    console.log("payload::::", payload);
    if (!Object.keys(payload).length)
      throw new BadRequestError("Missing Payload Update");
    const productUpdated = await ProductRepo.updateProductById({
      productId,
      payload,
    });
    if (!productUpdated) throw new NotFoundError("Product doesn't exists");
    return { productUpdated };
  }
  static async deleteProductById(req, res) {
    const { productId } = req.params;
    const productDeleted = await ProductRepo.deleteProductById({ productId });
    if (!productDeleted) throw new NotFoundError("Product doesn't exists");
    return { productDeleted };
  }
}

module.exports = ProductService;
