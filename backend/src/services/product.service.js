const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductModel } = require("../models");
const {
  ProductRepo,
  BrandRepo,
  ProductCategoryRepo,
} = require("../repositories");
const {
  convertOperatorObject,
  getOptionOperator,
  convertSortBy,
  convertFieldsToArray,
} = require("../utils");
class ProductService {
  static async createProduct(req, res) {
    const payload = req.body;
    const newProduct = await ProductModel.create(payload);
    if (!newProduct) throw new BadRequestError("Create Product Error");
    return newProduct;
  }

  static async getAllProducts(req, res) {
    const { sort, limit, page, fields, unFields, numericFilters } = req.query;
    const operatorFilter = convertOperatorObject({
      numericFilters,
      option: getOptionOperator([
        "product_price",
        "product_quantity",
        "product_sold",
      ]),
    });

    console.log(sort, limit, page, fields, unFields, numericFilters);

    const products = await ProductRepo.getAllProducts({
      sort,
      limit,
      page,
      select: convertFieldsToArray(fields),
      unselect: convertFieldsToArray(unFields),
      filter: { ...operatorFilter },
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

    const keyPayload = Object.getOwnPropertyNames(payload);

    // Check Product brand has exist
    if (keyPayload.includes("product_brand")) {
      const brandId = payload.product_brand;
      const findBrand = await BrandRepo.getBrandById({ brandId });
      if (!findBrand) throw new NotFoundError("Brand doesn't exist");
    }
    // Check Product category has exist
    if (keyPayload.includes("product_category")) {
      const productCategoryId = payload.product_category;
      const findProductCategory =
        await ProductCategoryRepo.getProductCategoryById({ productCategoryId });
      if (!findProductCategory)
        throw new NotFoundError("Product Category doesn't exist");
    }

    if (!Object.keys(payload).length)
      // Check Product brand has exist
      throw new BadRequestError("Missing Payload Update");
    const productUpdated = await ProductRepo.updateProductById({
      productId,
      payload,
    });
    if (!productUpdated) throw new BadRequestError("Product update error");
    return { productUpdated };
  }
  static async deleteProductById(req, res) {
    const { productId } = req.params;
    const productDeleted = await ProductRepo.deleteProductById({ productId });
    if (!productDeleted) throw new BadRequestError("Product delete error");
    return { productDeleted };
  }
}

module.exports = ProductService;
