const { BadRequestError, NotFoundError } = require("../core/error.response");
const {
  ProductModel,
  RatingModel,
  ProductMainInfoModel,
} = require("../models");
const {
  ProductRepo,
  BrandRepo,
  ProductCategoryRepo,
  ProductMainInfoRepo,
} = require("../repositories");
const {
  convertOperatorObject,
  getOptionOperator,
  convertFieldsToArray,
  getFieldsPath,
  getImagesPath,
} = require("../utils");

class ProductService {
  static async createProduct(req, res) {
    const payload = req.body;
    const { product_brandId, product_categoryId } = payload;
    // 1. Check brand
    const findBrand = await BrandRepo.getBrandById({
      brandId: product_brandId,
    });
    if (!findBrand) throw new NotFoundError("Brand doesn't exist");

    // 2. Check category
    const findCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId: product_categoryId,
    });
    if (!findCategory)
      throw new NotFoundError("Product category doesn't exist");

    // 3. Check image
    const fieldsImage = req?.files;
    if (!Object.keys(fieldsImage).length)
      throw new BadRequestError("Please provide images for product");

    // 3. Create product
    const dataCreate = {
      ...payload,
      ...getFieldsPath(fieldsImage),
    };
    const newProduct = await ProductModel.create(dataCreate);

    // 4. Create Storage(RAM, ROM, color, price)
    try {
      const newMainInfoProduct = await ProductMainInfoModel.create({
        ...payload,
        product_productId: newProduct._id,
        ...getFieldsPath(fieldsImage),
      });
      await newProduct.updateOne({
        $set: {
          product_mainInfo: newMainInfoProduct._id,
        },
      });
      return newProduct;
    } catch (error) {
      await ProductRepo.deleteProductById({ productId: newProduct._id });
      throw new BadRequestError(error.message);
    }
  }

  // Some thing provide: storage, image
  static async provideInfoProductById(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    const fieldsImage = req?.files;

    console.log("fieldsImage:::", getFieldsPath(fieldsImage));

    // 1. Get product and check product
    const product = await ProductRepo.getProductById({ productId });
    if (!product) throw new NotFoundError("Product not found for provide info");

    // 2. Create new MainInfo with this product
    const newMainInfo = await ProductMainInfoModel.create({
      ...payload,
      product_productId: productId,
      product_imageColor: getFieldsPath(fieldsImage).product_imageColor,
    });

    try {
      // 3.Perform update
      await product.updateOne({
        $addToSet: {
          product_mainInfo: newMainInfo._id,
        },
        $set: {
          product_images: [
            ...product.product_images,
            ...getFieldsPath(fieldsImage).product_images,
          ],
        },
      });
    } catch (error) {
      await ProductMainInfoRepo.deleteProductMainById({
        productMainInfoId: newMainInfo._id,
      });
      throw new BadRequestError(error.message);
    }

    return {
      newInfoProvide: newMainInfo,
      product_images: getFieldsPath(fieldsImage),
    };
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
    const fieldsImage = req?.files;

    let fieldsPath = {};
    if (Object.keys(fieldsImage).length > 0)
      for (const [keys, value] of Object.entries(fieldsImage)) {
        fieldsPath[keys] = value.map((v) => v.path);
      }

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

    const dataUpdate = {
      ...payload,
      ...fieldsPath,
    };

    console.log("dataUpdate:::", dataUpdate);
    const productUpdated = await ProductRepo.updateProductById({
      productId,
      payload: dataUpdate,
    });
    if (!productUpdated) throw new BadRequestError("Product update error");
    return { productUpdated };
  }

  static async deleteProductById(req, res) {
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
