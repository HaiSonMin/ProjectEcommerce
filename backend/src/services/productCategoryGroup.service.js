const { BadRequestError, NotFoundError } = require("../core/error.response");
const { ProductCategoryGroupModel } = require("../models");
const {
  ProductCategoryGroupRepo,
  ProductCategoryRepo,
} = require("../repositories");
const { getInfoData } = require("../utils");

class ProductCategoryGroupService {
  static async createProductCategoryGroup(req, res) {
    const payload = req.body;
    const { path } = req?.file || {};
    console.log(path);
    const newProductCategoryGroup = await ProductCategoryGroupModel.create({
      ...payload,
      productCategoryGroup_image: path,
    });
    if (!newProductCategoryGroup)
      throw new BadRequestError("Create CategoryGroup Error");
    return newProductCategoryGroup;
  }

  static async getAllProductCategories(req, res) {
    const { sort, limit, page } = req.query;
    const { productCategoriesGroup, totalProductCategoriesGroup } =
      await ProductCategoryGroupRepo.getAllProductCategoriesGroup({
        sort,
        limit,
        page,
      });
    return {
      totalProductCategoriesGroup,
      productCategoriesGroupPerPage: productCategoriesGroup.length,
      productCategoriesGroup,
    };
  }

  static async getProductCategoryGroupById(req, res) {
    const { productCategoryGroupId } = req.params;
    const productCategoryGroup =
      await ProductCategoryGroupRepo.getProductCategoryGroupById({
        productCategoryGroupId,
      });

    if (!productCategoryGroup)
      throw new NotFoundError("Product category group not found");
    return productCategoryGroup;
  }

  static async updateProductCategoryGroup(req, res) {
    const { productCategoryGroupId } = req.params;
    const payload = req.body;

    const { path: pathImage } = req?.file || {};

    const productCategoryGroupUpdated =
      await ProductCategoryGroupRepo.updateProductCategoryGroupById({
        productCategoryGroupId,
        payload: {
          ...payload,
          productCategoryGroup_image:
            pathImage ?? payload.productCategoryGroup_image,
        },
      });
    if (!productCategoryGroupUpdated)
      throw new BadRequestError("Updated Category Group Error");
    return productCategoryGroupUpdated;
  }

  static async deleteProductCategoryGroup(req, res) {
    const { productCategoryGroupId } = req.params;
    const productCategoryGroupDeleted =
      await ProductCategoryGroupRepo.deleteProductCategoryGroupById({
        productCategoryGroupId,
      });
    if (!productCategoryGroupDeleted)
      throw new BadRequestError("Delete CategoryGroup Error");
    return productCategoryGroupDeleted;
  }

  static async addGroup(req) {
    const { productCategoriesGroup } =
      await ProductCategoryGroupRepo.getAllProductCategoriesGroup({
        sort: "ctime",
      });

    console.log("productCategoriesGroup:::", productCategoriesGroup);

    const { productCategories, totalProductCategories } =
      await ProductCategoryRepo.getAllProductCategories({
        sort: "ctime",
        limit: 10e9,
      });

    await Promise.all(
      productCategoriesGroup.map(
        async (productCategoryGroup) =>
          await productCategoryGroup.updateOne({
            $set: { productCategoryGroup_categoryChildren: [] },
          })
      )
    );

    await Promise.all(
      productCategoriesGroup.map(async (productCategoryGroup) => {
        console.log("-------------------------");
        const productCategoriesSameGroup = productCategories.filter(
          (productCategory) => {
            console.log(productCategory.productCategory_group._id.toString());
            return (
              productCategory.productCategory_group._id.toString() ===
              productCategoryGroup._id.toString()
            );
          }
        );
        return productCategoriesSameGroup.map(
          async (productCategory) =>
            await productCategoryGroup.updateOne({
              $addToSet: {
                productCategoryGroup_categoryChildren: productCategory._id,
              },
            })
        );
        // console.log(
        //   "productCategoryGroup._id:::",
        //   productCategoryGroup._id.toString()
        // );
        // console.log(
        //   "productCategoriesIds.length:::",
        //   productCategoriesIds.length
        // );
        // console.log("productCategoriesIds:::", productCategoriesIds);
      })
    );

    return "update success";
  }
}

module.exports = ProductCategoryGroupService;
