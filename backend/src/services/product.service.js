const { BadRequestError, NotFoundError } = require("../core/error.response");
const {
  ProductModel,
  RatingModel,
  ProductMainInfoModel,
  ProductSpecificationModel,
} = require("../models");
const {
  ProductRepo,
  BrandRepo,
  ProductCategoryRepo,
  ProductMainInfoRepo,
} = require("../repositories");
const {
  convertFieldsToArray,
  getFieldsPath,
  getImagesPath,
  convertToMongoObjectId,
} = require("../utils");
const {
  mongoQueryAggregate,
  convertKeyForQueryAggregate,
} = require("../utils/mongoQueryAggregate");

class ProductService {
  static async createProduct(req, res) {
    const payload = req.body;
    const { product_brand, product_category } = payload;
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
    console.log(fieldsImage);
    if (!Object.keys(fieldsImage).length)
      throw new BadRequestError("Please provide images for product");

    console.log("getFieldsPath(fieldsImage)::", getFieldsPath(fieldsImage));
    console.log("Payload::::", payload);

    // 3. Create product
    const dataCreate = {
      ...payload,
      product_thumb: getFieldsPath(fieldsImage)["product_thumb"][0],
      product_images: getFieldsPath(fieldsImage)["product_images"],
    };
    const newProduct = await ProductModel.create(dataCreate);

    // 4. Create productMainInfo(RAM, ROM, color, price)
    try {
      const newMainInfoProduct = await ProductMainInfoModel.create({
        ...payload,
        product_productId: newProduct._id,
        product_imageColor: getFieldsPath(fieldsImage)["product_imageColor"][0],
      });

      const newProductSpecification = await ProductSpecificationModel.create({
        ...payload,
        specification_productId: newProduct._id,
      });

      // Add specification for productMainInfo
      await newMainInfoProduct.updateOne({
        $set: {
          product_specificationId: newProductSpecification._id,
        },
      });

      await newProduct.updateOne({
        $set: {
          product_mainInfo: newMainInfoProduct._id,
        },
      });
      console.log("newProduct:::", newProduct);
      return newProduct;
    } catch (error) {
      await ProductRepo.deleteProductById({ productId: newProduct._id });
      throw new BadRequestError(error.message);
    }
  }

  static async getAllProducts(req, res) {
    const { sort, limit, page, fields, unFields, numericFilters } = req.query;
    const { lookups, matches } = mongoQueryAggregate({
      optionFilters: convertKeyForQueryAggregate([
        "brands.product_brand.brand",
        "productcategories.product_category.category",
        "productmaininfos.product_mainInfo.productMainInfo",
      ]),
      numericFilters,
    });

    const { products, totalProducts } = await ProductRepo.getAllProducts({
      sort,
      limit,
      page,
      select: convertFieldsToArray(fields),
      unselect: convertFieldsToArray(unFields),
      lookups,
      matches,
    });

    return {
      totalProducts: totalProducts,
      productsPerPage: products.length,
      products,
    };
  }

  static async getProductById(req, res) {
    const { productId } = req.params;
    const product = await ProductRepo.getProductById({ productId });
    if (!product) throw new NotFoundError("Product doesn't exists");
    return product;
  }

  static async getProductMainInfoById(req, res) {
    const { productMainInfoId } = req.params;
    const productMainInfo = await ProductMainInfoRepo.getProductMainInfoById(
      productMainInfoId
    );
    if (!productMainInfo)
      throw new NotFoundError("Product main info doesn't exists");
    return productMainInfo;
  }

  static async getProductByNameOrDescription(req, res) {
    const { keySearch } = req.body;
    const products = await ProductRepo.getProductByNameOrDescription({
      keySearch,
    });
    if (!products.length) throw new NotFoundError("Product don't exists");
    return { products };
  }

  static async updateProductBasic(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    const fieldsImage = req?.files;

    const keyPayload = Object.getOwnPropertyNames(payload);

    // Check product
    const product = await ProductRepo.getProductById({ productId });
    if (!product) throw new NotFoundError("Product not found for update");

    // Check Product brand if update product brand
    if (keyPayload.includes("product_brand")) {
      const brandId = payload.product_brand;
      const findBrand = await BrandRepo.getBrandById({ brandId });
      if (!findBrand) throw new NotFoundError("Brand doesn't exist");
    }

    // Check Product category if update product category
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

    let dataUpdate;
    console.log("product.product_images:::", product.product_images);
    console.log(
      "fieldsImage:::",
      getFieldsPath(fieldsImage)?.["product_images"]
    );
    if (fieldsImage && getFieldsPath(fieldsImage)["product_images"]) {
      dataUpdate = {
        product_thumb: getFieldsPath(fieldsImage)["product_thumb"]?.[0],
        product_images: [
          ...product.product_images,
          ...getFieldsPath(fieldsImage)["product_images"],
        ],
        ...payload,
      };
    } else if (fieldsImage) {
      console.log("UpdateThumb");
      dataUpdate = {
        product_thumb: getFieldsPath(fieldsImage)["product_thumb"]?.[0],
        ...payload,
      };
    } else {
      dataUpdate = {
        ...payload,
      };
    }
    const productUpdated = await ProductRepo.updateProductById({
      productId,
      payload: dataUpdate,
    });
    if (!productUpdated) throw new BadRequestError("Product update error");
    return productUpdated;
  }

  static async updateProductMainInfo(req, res) {
    const { productId } = req.params;
    const { _id: product_mainInfoId, ...payload } = req.body;
    const { path } = req?.file || {};

    // 1.Check product have exist
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct) throw new NotFoundError("Product not exist by update");

    console.log(findProduct);

    // 2.Check productMainInfo have exist in to product
    const findId = findProduct.product_mainInfo.find(
      (product) => product._id.toString() === product_mainInfoId
    );

    if (!findId) throw new NotFoundError("Product main info not exist");

    // 3.Check productMainInfo have exist
    const findProductMainInfo =
      await ProductMainInfoRepo.getProductMainInfoById(product_mainInfoId);
    if (!findProductMainInfo)
      throw new NotFoundError("Product main info not exist");

    // 4. Update
    const productMainInfoUpdated =
      await ProductMainInfoRepo.updateProductMainInfo({
        productMainInfoId: product_mainInfoId,
        payload: {
          ...payload,
          product_imageColor: path,
        },
      });

    // 5. Check update has success
    if (!productMainInfoUpdated) throw new BadRequestError("Update error");

    return { productMainInfoUpdated };
  }

  // Some thing provide: storage, image
  static async provideInfoProduct(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    const { path } = req?.file || {};

    console.log(req?.file);

    // 1. Get product and check product
    const product = await ProductRepo.getProductById({ productId });
    if (!product) throw new NotFoundError("Product not found for provide info");

    // 2. Create new MainInfo with this product
    const newProductMainInfo = await ProductMainInfoModel.create({
      ...payload,
      product_imageColor: path,
    });

    console.log("newProductMainInfo:::", newProductMainInfo);

    try {
      // 3.Perform update
      await product.updateOne({
        $addToSet: {
          product_mainInfo: newProductMainInfo._id,
        },
      });
    } catch (error) {
      await ProductMainInfoRepo.deleteProductMainById({
        productMainInfoId: newProductMainInfo._id,
      });
      throw new BadRequestError(error.message);
    }

    return newProductMainInfo;
  }

  static async deleteProductById(req, res) {
    const { productId } = req.params;
    // 1. Delete product
    const productDeleted = await ProductRepo.deleteProductById({ productId });
    if (!productDeleted) throw new BadRequestError("Product delete error");
    // 2. Delete ratings in product
    await RatingModel.deleteMany({ rating_productId: productId });
    // 2. Delete productMainInfo
    await ProductMainInfoModel.deleteMany({ product_productId: productId });

    return { productDeleted };
  }

  static async deleteProductMainInfo(req, res) {
    const { productId } = req.params;
    const { _id: product_mainInfoId } = req.body;
    // 1.Check product have exist
    const findProduct = await ProductRepo.getProductById({ productId });
    if (!findProduct) throw new NotFoundError("Product not exist by update");

    // 2.Check productMainInfo have exist in to product
    const findId = findProduct.product_mainInfo.find(
      (product) => product._id.toString() === product_mainInfoId
    );

    if (!findId) throw new NotFoundError("Product main info not exist");

    // 3.Check productMainInfo have exist
    const productMainInfoDeleted =
      await ProductMainInfoRepo.deleteProductMainInfo(product_mainInfoId);
    if (!productMainInfoDeleted)
      throw new NotFoundError("Product main info not exist for delete");

    return productMainInfoDeleted;
  }
}

module.exports = ProductService;
