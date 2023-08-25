const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductCategoryModel, DemandModel } = require("../models");
const {
  ProductCategoryRepo,
  DemandRepo,
  ProductCategoryGroupRepo,
} = require("../repositories");
const { capitalizeFirstLetter } = require("../utils");

class ProductCategoryService {
  static async createProductCategory(req, res) {
    const payload = req.body;
    const { path } = req?.file || {};
    console.log(path);
    const newProductCategory = await ProductCategoryModel.create({
      ...payload,
      productCategory_image: path,
    });
    if (!newProductCategory) throw new BadRequestError("Create Category Error");
    return newProductCategory;
  }

  static async getAllProductCategories(req, res) {
    const { sort, limit, page } = req.query;
    const { productCategories, totalProductCategories } =
      await ProductCategoryRepo.getAllProductCategories({
        sort,
        limit,
        page,
      });
    return {
      totalProductCategories,
      productCategoriesPerPage: productCategories.length,
      productCategories,
    };
  }

  static async getProductCategoryById(req, res) {
    const { productCategoryId } = req.params;
    const productCategory = await ProductCategoryRepo.getProductCategoryById({
      productCategoryId,
    });

    if (!productCategory) throw new NotFoundError("Product category not found");
    return productCategory;
  }

  static async getProductCategoriesByGroupId(req, res) {
    const { productCategoryGroupId } = req.params;
    const productCategories =
      await ProductCategoryRepo.getProductCategoryGroupId({
        productCategoryGroupId,
      });

    if (!productCategories.length)
      throw new NotFoundError("Product categories not found");
    return productCategories;
  }

  static async getProductCategoriesByIds(req, res) {
    const { productCategoriesIds } = req.query;
    const productCategories =
      await ProductCategoryRepo.getProductCategoriesByIds({
        productCategoriesIds,
      });
    return productCategories;
  }

  static async searchProductCategories(req, res) {
    const { keySearch, limit, page } = req.query;
    console.log(keySearch);
    const { productCategories, totalProductCategories } =
      await ProductCategoryRepo.searchProductCategories({
        keySearch,
        page,
        limit,
      });
    return {
      totalProductCategories,
      productCategoriesPerPage: productCategories.length,
      productCategories,
    };
  }

  static async updateProductCategory(req, res) {
    const { productCategoryId } = req.params;
    const payload = req.body;

    const { path: pathImage } = req?.file || {};

    const productCategoryUpdated =
      await ProductCategoryRepo.updateProductCategoryById({
        productCategoryId,
        payload: {
          ...payload,
          productCategory_image: pathImage ?? payload.productCategory_image,
        },
      });
    if (!productCategoryUpdated)
      throw new BadRequestError("Updated Category Error");
    return productCategoryUpdated;
  }

  static async deleteProductCategory(req, res) {
    const { productCategoryId } = req.params;
    const productCategoryDeleted =
      await ProductCategoryRepo.deleteProductCategoryById({
        productCategoryId,
      });
    if (!productCategoryDeleted)
      throw new BadRequestError("Delete Category Error");
    return productCategoryDeleted;
  }

  // static async change(req) {
  //   const { productCategories } =
  //     await ProductCategoryRepo.getAllProductCategories({});

  //   await Promise.all(
  //     productCategories.map(async (cate) => {
  //       const typeUpdate = capitalizeFirstLetter(cate.productCategory_type);
  //       await ProductCategoryModel.updateOne(
  //         { productCategory_type: cate.productCategory_type },
  //         { productCategory_type: typeUpdate }
  //       );
  //     })
  //   );
  // }

  // static async addDemand(req) {
  //   const { sort, page, limit } = req.query;
  //   const { demands } = await DemandRepo.getAllDemands({
  //     sort,
  //     page,
  //     limit,
  //   });
  //   demands.map(async (demand, index) => {
  //     const productCategory = await ProductCategoryRepo.getProductCategoryById({
  //       productCategoryId: demand.demand_productCategory[0]._id,
  //     });
  //     if (productCategory)
  //       await productCategory.updateOne({
  //         $addToSet: { productCategory_demands: demand._id },
  //       });
  //   });
  //   console.log("Push");
  // }

  // static async change(req) {
  //   const { productCategoriesGroup } =
  //     await ProductCategoryGroupRepo.getAllProductCategoriesGroup({});
  //   await Promise.all(
  //     productCategoriesGroup.map(async (cateGroup) => {
  //       const newReg = new RegExp(cateGroup.productCategoryGroup_name, "i");
  //       await ProductCategoryModel.updateMany(
  //         { $text: { $search: newReg } },
  //         { $set: { productCategory_groupId: cateGroup._id } }
  //       );
  //     })
  //   );
  // }
}

module.exports = ProductCategoryService;
