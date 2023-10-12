const CONSTANT = require("../constant");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const redis = require("../databases/init.redisDB");
const { ProductModel, RatingModel } = require("../models");
const {
  BrandRepo,
  ProductRepo,
  ProductCategoryRepo,
} = require("../repositories");
const { getFieldsPath, setDataNested } = require("../utils");

class ProductService {
  static async createProduct(req, res) {
    const payload = req.body;
    const { product_brand, product_category } = payload;
    console.log(payload);
    // 1. Check brand
    const findBrand = await BrandRepo.getBrandById({
      brandId: product_brand,
    });
    if (!findBrand) throw new NotFoundError("Brand doesn't exist");

    // 2. Check category
    const findCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId: product_category,
    });
    if (!findCategory)
      throw new NotFoundError("Product category doesn't exist");

    // 3. Check image
    const fieldsImage = req?.files;
    if (!Object.keys(fieldsImage).length)
      throw new BadRequestError("Please provide images for product");

    // 3. Create product
    let dataCreate = { ...payload };
    for (const [key, value] of Object.entries(getFieldsPath(fieldsImage))) {
      if (!key.includes("["))
        dataCreate = {
          ...dataCreate,
          [key]: value,
        };
      else {
        dataCreate = setDataNested(dataCreate, { [key]: value });
      }
    }
    dataCreate = {
      ...dataCreate,
      product_thumb: dataCreate.product_thumb[0],
    };
    console.log("dataCreated::::", dataCreate);

    const newProduct = await ProductModel.create(dataCreate);
    if (!newProduct) throw new BadRequestError("Create product error");

    return newProduct;
  }

  static async getAllProducts(req, res) {
    const { sort, limit, page, status, numericFilters } = req.query;

    console.log(numericFilters);

    // console.log(convertOperatorObject({ options, numericFilters }));
    const productRedis = await redis.get("products");
    if (productRedis) return JSON.parse(productRedis);

    const { products, totalProducts } = await ProductRepo.getAllProducts({
      sort,
      page,
      limit,
      status,
    });

    redis.setex(
      "products",
      CONSTANT.TIME_STORE_REDIS,
      JSON.stringify({
        totalProducts: totalProducts,
        productsPerPage: products.length,
        products,
      })
    );

    return {
      totalProducts: totalProducts,
      productsPerPage: products.length,
      products,
    };
  }

  static async getProductById(req, res) {
    const { productId } = req.params;
    const product = await ProductRepo.getProductById({ productId });
    console.log("product:::", product);
    if (!product) throw new NotFoundError("Product doesn't exists");
    return product;
  }

  static async getProductByCategoryId(req, res) {
    const { categoryId } = req.params;
    const product = await ProductRepo.getProductByCategoryId({ categoryId });
    if (!product) throw new NotFoundError("Product doesn't exists");
    return product;
  }

  static async searchProduct(req, res) {
    const { keySearch, limit, page, sort, select } = req.body;
    const products = await ProductRepo.searchProduct({
      keySearch,
      limit,
      page,
      sort,
      select,
    });
    if (!products.length) throw new NotFoundError("Product don't exists");
    return { products };
  }

  static async updateProduct(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    const fieldsImage = req?.files;
    let fieldsPath = getFieldsPath(fieldsImage);

    const keyPayload = Object.getOwnPropertyNames(payload);

    // 1.Check product
    const product = await ProductRepo.getProductById({ productId });
    if (!product) throw new NotFoundError("Product not found for update");

    // 2.Check Product brand if update product brand
    if (keyPayload.includes("product_brand")) {
      const brandId = payload.product_brand;
      const findBrand = await BrandRepo.getBrandById({ brandId });
      if (!findBrand) throw new NotFoundError("Brand doesn't exist");
    }

    // 3.Check Product category if update product category
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

    // 4. Update Main info
    let dataUpdate = { ...product };

    // 4.1 If delete image
    dataUpdate = { ...dataUpdate, ...payload };
    console.log(Object.keys(fieldsPath));

    // 4.2 If add more image
    if (Object.keys(fieldsPath).length) {
      for (const [key, value] of Object.entries(fieldsPath)) {
        if (key === "product_thumb")
          dataUpdate = {
            ...dataUpdate,
            [key]: value[0],
          };
        else if (!key.includes("[")) {
          dataUpdate = {
            ...dataUpdate,
            [key]: [...dataUpdate[key], ...value],
          };
        }
        // 5. Update if image is path nested
        else dataUpdate = setDataNested(dataUpdate, { [key]: value });
      }
    }
    const productUpdated = await ProductRepo.updateProductById({
      productId,
      payload: dataUpdate,
    });

    if (!productUpdated) throw new BadRequestError("Product update error");
    return productUpdated;
  }

  static async deleteProduct(req, res) {
    const { productId } = req.params;
    // 1. Delete product
    const productDeleted = await ProductRepo.deleteProductById({ productId });
    if (!productDeleted) throw new BadRequestError("Product delete error");
    // 2. Delete ratings in product
    await RatingModel.deleteMany({ rating_productId: productId });

    return { productDeleted };
  }
}

module.exports = ProductService;
