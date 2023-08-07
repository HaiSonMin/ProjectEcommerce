const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductModel, RatingModel } = require("../models");
const {
  BrandRepo,
  ProductRepoV2,
  ProductCategoryRepo,
  ProductMainInfoRepo,
} = require("../repositories");
const { getFieldsPath } = require("../utils");

class ProductServiceV2 {
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

    const attribute = {
      product_code: Date.now(),
      product_key: "Green",
      product_price: 23000000,
      product_imageColor: getFieldsPath(fieldsImage)["product_thumb"][0],
      product_description: "Best phone in the world",
      product_specification: {
        product_monitor: {
          screenTechnology: "OLED",
          resolution: "Super Retina XDR (2556 x 1179 Pixels)",
          widescreen: "6.1 - Tần số quét 120 Hz",
          maximumBrightness: "2000nits",
          touchScreen: "Kính cường lực Ceramic Shield",
        },
        product_rearCamera: {
          resolution: "Chính 48 MP & Phụ 12 MP, 12 MP",
          flim: "4K 2160p@24fps",
          flashLight: "Có",
          feature: "Ban đêm (Night Mode)",
        },
        product_frontCamera: {
          resolution: "12 MP",
          feature: "Bộ lọc màu",
        },
        product_CPU: {
          operatingSystem: "iOS 16",
          processor: "Apple A16 Bionic 6 nhân",
          speedCPU: "3.46 GHz",
          graphics: "Apple GPU 5 nhân",
        },
        product_diskSpace: {
          ram: "6GB",
          rom: "128GB",
          phoneBook: "No limit",
        },
        product_connect: {
          mobileNetwork: "Hỗ trợ 5G",
          sim: "1 Nano SIM & 1 eSIM",
          wifi: "Wi-Fi 802.11 a/b/g/n/ac/ax",
          gps: "BEIDOU",
          bluetooth: "v5.3",
          connector: "Lightning",
          headphoneJack: "Lightning",
          ortherConnecttions: "NFC",
        },
        product_batteryCharge: {
          batteryCapacity: "3200 mAh",
          batteryType: "Li-Ion",
          maximumChargingSupport: "20W",
          batteryTechnology: "Sạc không dây",
        },
        product_amenity: {
          security: "Mở khoá khuôn mặt Face ID",
          specialFeatures: "Phát hiện va chạm (Crash Detection)",
          waterDustResistance: "IP68",
          record: "Ghi âm mặc định",
          watchMovie: "H.264(MPEG4-AVC)",
        },
        product_generalInformation: {
          design: "Nguyên khối",
          material: "Khung thép không gỉ & Mặt lưng kính cường lực",
          size: "Dài 147.5 mm - Ngang 71.5 mm - Dày 7.85 mm",
          mass: "206g",
          release: "09/2022",
        },
      },
    };

    // 3. Create product
    const dataCreate = {
      ...payload,
      // product_attributes: JSON.parse(payload.product_attribute), // Real
      product_attributes: attribute, // Text
      product_thumb: getFieldsPath(fieldsImage)["product_thumb"][0],
      product_imagesProduct:
        getFieldsPath(fieldsImage)["product_imagesProduct"],
      product_imagesAttribute:
        getFieldsPath(fieldsImage)["product_imagesAttribute"],
    };

    const newProduct = await ProductModel.create(dataCreate);
    if (!newProduct) throw new BadRequestError("Create product error");

    return newProduct;
  }

  static async getAllProducts(req, res) {
    const { sort, limit, page, status, numericFilters } = req.query;

    console.log(numericFilters);

    // console.log(convertOperatorObject({ options, numericFilters }));

    const { products, totalProducts } = await ProductRepoV2.getAllProducts({
      sort,
      page,
      limit,
      status,
    });

    return {
      totalProducts: totalProducts,
      productsPerPage: products.length,
      products,
    };
  }

  static async getProductById(req, res) {
    const { productId } = req.params;
    const product = await ProductRepoV2.getProductById({ productId });
    if (!product) throw new NotFoundError("Product doesn't exists");
    return product;
  }

  static async getProductByNameOrDescription(req, res) {
    const { keySearch, limit, page, sort, select } = req.body;
    const products = await ProductRepoV2.getProductByNameOrDescription({
      keySearch,
      limit,
      page,
      sort,
      select,
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
    const product = await ProductRepoV2.getProductById({ productId });
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
    // If file images have chose
    if (
      fieldsImage &&
      getFieldsPath(fieldsImage)?.["product_imagesProduct"] &&
      getFieldsPath(fieldsImage)?.["product_imagesAttribute"]
    ) {
      dataUpdate = {
        product_thumb: getFieldsPath(fieldsImage)?.["product_thumb"]?.[0],
        product_imagesProduct: [
          ...product.product_imagesProduct,
          ...getFieldsPath(fieldsImage)?.["product_imagesProduct"],
        ],
        product_imagesAttribute: [
          ...product.product_imagesAttribute,
          ...getFieldsPath(fieldsImage)?.["product_imagesAttribute"],
        ],
        ...payload,
      };
    } else if (
      fieldsImage &&
      getFieldsPath(fieldsImage)?.["product_imagesProduct"]
    ) {
      dataUpdate = {
        product_thumb: getFieldsPath(fieldsImage)?.["product_thumb"]?.[0],
        product_imagesProduct: [
          ...product.product_imagesProduct,
          ...getFieldsPath(fieldsImage)?.["product_imagesProduct"],
        ],
        ...payload,
      };
    } else if (
      fieldsImage &&
      getFieldsPath(fieldsImage)?.["product_imagesAttribute"]
    ) {
      dataUpdate = {
        product_thumb: getFieldsPath(fieldsImage)?.["product_thumb"]?.[0],
        product_imagesAttribute: [
          ...product.product_imagesAttribute,
          ...getFieldsPath(fieldsImage)?.["product_imagesAttribute"],
        ],
        ...payload,
      };
    } else {
      dataUpdate = {
        product_thumb: getFieldsPath(fieldsImage)["product_thumb"]?.[0],
        ...payload,
      };
    }

    const productUpdated = await ProductRepoV2.updateProductById({
      productId,
      payload: dataUpdate,
    });
    if (!productUpdated) throw new BadRequestError("Product update error");
    return productUpdated;
  }

  static async updateProductAttribute(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    const { path } = req?.file || {};

    // 1.Check product have exist
    const product = await ProductRepoV2.getProductById({ productId });
    if (!product) throw new NotFoundError("Product not exist by update");

    const productAttributes = product.product_attributes;
    let indexAttribute = 0;

    // 2. Check product attribute code
    const findAttribute = productAttributes.find((item, i) => {
      indexAttribute = i;
      return Number(item.product_code) === Number(payload.product_code);
    });

    if (!findAttribute)
      throw new NotFoundError("Product attribute doesn't exist");

    // 3. Create product attribute
    const newAttribute = {
      ...findAttribute,
      ...payload,
      product_imageColor: path ?? findAttribute.product_imageColor,
    };

    //4. Update product attribute
    productAttributes[indexAttribute] = newAttribute;

    await product.updateOne({
      $set: {
        product_attributes: productAttributes,
      },
    });
    return newAttribute;
  }

  // Some thing provide: storage, image
  static async provideAttributeProduct(req, res) {
    const { productId } = req.params;
    const payload = req.body;
    const { path } = req?.file || {};

    // 1. Get product and check product
    const product = await ProductRepoV2.getProductById({ productId });
    if (!product)
      throw new NotFoundError("Product not found for provide attribute");

    const attribute = {
      product_code: Date.now(),
      product_key: "Black",
      product_price: 23200000,
      product_imageColor: path,
      product_description: "Best phone in the world",
      product_specification: {
        product_monitor: {
          screenTechnology: "OLED",
          resolution: "Super Retina XDR (2556 x 1179 Pixels)",
          widescreen: "6.1 - Tần số quét 120 Hz",
          maximumBrightness: "2000nits",
          touchScreen: "Kính cường lực Ceramic Shield",
        },
        product_rearCamera: {
          resolution: "Chính 48 MP & Phụ 12 MP, 12 MP",
          flim: "4K 2160p@24fps",
          flashLight: "Có",
          feature: "Ban đêm (Night Mode)",
        },
        product_frontCamera: {
          resolution: "12 MP",
          feature: "Bộ lọc màu",
        },
        product_CPU: {
          operatingSystem: "iOS 16",
          processor: "Apple A16 Bionic 6 nhân",
          speedCPU: "3.46 GHz",
          graphics: "Apple GPU 5 nhân",
        },
        product_diskSpace: {
          ram: "6GB",
          rom: "128GB",
          phoneBook: "No limit",
        },
        product_connect: {
          mobileNetwork: "Hỗ trợ 5G",
          sim: "1 Nano SIM & 1 eSIM",
          wifi: "Wi-Fi 802.11 a/b/g/n/ac/ax",
          gps: "BEIDOU",
          bluetooth: "v5.3",
          connector: "Lightning",
          headphoneJack: "Lightning",
          ortherConnecttions: "NFC",
        },
        product_batteryCharge: {
          batteryCapacity: "3200 mAh",
          batteryType: "Li-Ion",
          maximumChargingSupport: "20W",
          batteryTechnology: "Sạc không dây",
        },
        product_amenity: {
          security: "Mở khoá khuôn mặt Face ID",
          specialFeatures: "Phát hiện va chạm (Crash Detection)",
          waterDustResistance: "IP68",
          record: "Ghi âm mặc định",
          watchMovie: "H.264(MPEG4-AVC)",
        },
        product_generalInformation: {
          design: "Nguyên khối",
          material: "Khung thép không gỉ & Mặt lưng kính cường lực",
          size: "Dài 147.5 mm - Ngang 71.5 mm - Dày 7.85 mm",
          mass: "206g",
          release: "09/2022",
        },
      },
    };

    // 2. Create new MainInfo with this product
    await product.updateOne({
      $push: {
        product_attributes: attribute,
      },
    });
    return;
  }

  static async deleteProductAttribute(req, res) {
    const { productId } = req.params;
    const { product_code } = req.body;
    // 1. Check product before delete product attribute
    const product = await ProductRepoV2.getProductById({ productId });
    if (!product) throw new BadRequestError("Product not found");

    // 2. Check product attribute before delete it
    const productAttributes = product.product_attributes;
    let indexProductAttribute = 0;

    const newProductAttributes = productAttributes.filter((item, index) => {
      indexProductAttribute = index;
      return Number(item.product_code) !== Number(product_code);
    });

    if (newProductAttributes.length === productAttributes.length)
      throw new NotFoundError("Product attribute does not exist");

    await product.updateOne({
      $set: { product_attributes: newProductAttributes },
    });

    return productAttributes[indexProductAttribute];
  }

  static async deleteProductById(req, res) {
    const { productId } = req.params;
    // 1. Delete product
    const productDeleted = await ProductRepoV2.deleteProductById({ productId });
    if (!productDeleted) throw new BadRequestError("Product delete error");
    // 2. Delete ratings in product
    await RatingModel.deleteMany({ rating_productId: productId });

    return { productDeleted };
  }
}

module.exports = ProductServiceV2;
