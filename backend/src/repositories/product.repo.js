const { convertToMongoObjectId } = require("../utils");
const { ProductModel } = require("../models");
const {
  skipPage,
  convertSortBy,
  getSelectData,
  getUnSelectData,
} = require("../utils");
const {
  convertKeyForQueryAggregate,
  convertSortByAggregate,
} = require("../utils/mongoQueryAggregate");

class ProductRepository {
  static async getAllProducts({
    sort,
    page = 1,
    limit = 10,
    filter,
    status = "all",
  }) {
    let fieldSearchStatus;
    if (status === "all") fieldSearchStatus = "";
    if (status === "available") fieldSearchStatus = "";
    if (status === "unavailable") fieldSearchStatus = "";
    console.log(convertSortBy(sort));
    const result = await ProductModel.aggregate([
      {
        $facet: {
          products: [
            {
              $lookup: {
                from: "brands",
                localField: "product_brand",
                foreignField: "_id",
                as: "product_brand",
              },
            },
            {
              $unwind: {
                path: "$product_brand",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "productcategories",
                localField: "product_category",
                foreignField: "_id",
                as: "product_category",
              },
            },
            {
              $unwind: {
                path: "$product_category",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                product_name: 1,
                product_thumb: 1,
                product_price: 1,
                product_available: 1,
                product_ratings: 1,
                product_brand: {
                  brand_name: 1,
                  brand_origin: 1,
                },
                product_category: {
                  productCategory_name: 1,
                },
              },
            },
            { $skip: skipPage({ page, limit }) },
            {
              $limit: +limit, // Replace 10 with the desired number of documents to limit
            },
            {
              $sort: convertSortBy(sort),
            },
          ],
          totalProducts: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);
    const products = result[0]?.products;
    const totalProducts = result[0]?.totalProducts[0]?.count;
    console.log(result);
    return { products, totalProducts };
  }

  static async getProductById({ productId, unselect }) {
    return await ProductModel.findById(convertToMongoObjectId(productId))
      .select(getUnSelectData(unselect))
      .populate([
        { path: "product_brand", select: ["brand_name", "brand_origin"] },
        { path: "product_category", select: "productCategory_name" },
        { path: "product_demands", select: "demand_name" },
        { path: "product_ratings" },
      ])
      .lean()
      .exec();
  }

  static async getProductByCategoryId({ categoryId }) {
    return await ProductModel.find({ product_category: categoryId })
      .select([
        "_id",
        "product_name",
        "product_thumb",
        "product_price",
        "product_available",
        "product_ratings",
        "product_priceAppliedDiscount",
      ])
      .populate([
        // { path: "product_brand", select: ["brand_name", "brand_origin"] },
        // { path: "product_category", select: "productCategory_name" },
        // { path: "product_demands", select: "demand_name" },
        { path: "product_ratings" },
      ])
      .lean()
      .exec();
  }

  static async getProductByIds({ productIds }) {
    return await ProductModel.find({ _id: { $in: productIds } })
      .lean()
      .exec();
  }

  static async getProductNotByIds({ productIds }) {
    return await ProductModel.find({ _id: { $nin: productIds } })
      .lean()
      .exec();
  }

  static async searchProduct({
    keySearch,
    page = 1,
    limit = 4,
    select,
    unselect,
  }) {
    const regexSearch = new RegExp(keySearch, "i");
    return await ProductModel.find({
      $text: { $search: regexSearch },
    })
      .select(getSelectData(select))
      .select(getUnSelectData(unselect))
      .skip(skipPage({ page, limit }))
      .limit(limit)
      .lean()
      .exec();
  }

  static async updateProductById({ productId, payload }) {
    return await ProductModel.findByIdAndUpdate(productId, payload, {
      new: true,
    })
      .lean()
      .exec();
  }

  static async deleteProductById({ productId }) {
    return await ProductModel.findByIdAndDelete(productId).lean().exec();
  }
}
module.exports = ProductRepository;
