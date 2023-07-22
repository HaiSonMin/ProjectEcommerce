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
  // static async getAllProducts({
  //   filter,
  //   page = 1,
  //   limit = 10,
  //   select,
  //   unselect,
  //   sort,
  // }) {
  //   const [products, totalProducts] = await Promise.all([
  //     ProductModel.find(filter)
  //       .select(getSelectData(select))
  //       .select(getUnSelectData(unselect))
  //       .skip(skipPage({ page, limit }))
  //       .limit(limit)
  //       .sort(convertSortBy(sort))
  //       .populate([
  //         { path: "product_brand", select: ["brand_name", "brand_origin"] },
  //         { path: "product_category", select: "productCategory_name" },
  //         { path: "product_mainInfo", select: ["-product_productId", "-__v"] },
  //         { path: "product_ratings" },
  //       ])
  //       .lean()
  //       .exec(),
  //     ProductModel.count(),
  //   ]);
  //   return { products, totalProducts };
  // }

  static async getAllProducts({
    lookups,
    matches,
    page = 1,
    limit = 10,
    select,
    unselect,
    sort,
  }) {
    // console.log("skipPage({ limit, page }):::", skipPage({ limit, page }));
    // console.log(lookups);
    // console.log(matches);
    const result = await ProductModel.aggregate([
      ...lookups,
      matches,
      {
        $facet: {
          products: [
            { $skip: skipPage({ page, limit }) },
            {
              $limit: +limit, // Replace 10 with the desired number of documents to limit
            },
            {
              $sort: convertSortByAggregate({
                fieldLocal: "productMainInfo",
                sort,
              }),
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
        { path: "product_mainInfo", select: ["-__v"] },
        { path: "product_ratings" },
      ])
      .exec();
  }
  static async getProductByIds({ productIds, select }) {
    return await ProductModel.find({ _id: { $in: productIds } })
      .select(getSelectData(select))
      .lean()
      .exec();
  }
  static async getProductNotByIds({ productIds }) {
    return await ProductModel.find({ _id: { $nin: productIds } })
      .lean()
      .exec();
  }
  static async getProductByNameOrDescription({
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
