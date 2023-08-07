import {
  IProductCategoryCreateResultApi,
  IProductCategoryUpdateResultApi,
  IProductCategoryGetAllResultApi,
  IProductCategoryGetByIdResultApi,
  IProductCategoryDeleteResultApi,
  IProductCategoriesGetByIdsResultApi,
} from "@/api-types/IProductCategoryResultApi";
import { IProductCategory } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { CONSTANT, http, resultAppendFormData } from "@/utils";

class ProductCategoryApi {
  async createProductCategory(args: Omit<IProductCategory, "_id">) {
    try {
      const response = await http.postForm(
        `${CONSTANT.PATH_V1_API.productCategory}/create`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductCategoryCreateResultApi,
        "isCreatingProductCategory"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getAllProductCategories(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.productCategory}/getAll`,
        {
          params: {
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
          },
        }
      );
      const result: Omit<
        IProductCategoryGetAllResultApi,
        "isGettingProductCategories"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoryById({
    _id: categoryId,
  }: Pick<IProductCategory, "_id">) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.productCategory}/getById/${categoryId}`
      );
      const result: Omit<
        IProductCategoryGetByIdResultApi,
        "isGettingProductCategory"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoriesByIds(categoriesIds: Array<string> | undefined) {
    console.log("categoriesIds:::", categoriesIds);
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.productCategory}/getByIds`,
        {
          params: {
            productCategoriesIds: categoriesIds?.toString(),
          },
        }
      );
      const result: Omit<
        IProductCategoriesGetByIdsResultApi,
        "isGettingProductCategories"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateProductCategory(args: IProductCategory) {
    try {
      const response = await http.patchForm(
        `v1/productCategory/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductCategoryUpdateResultApi,
        "isUpdatingProductCategory"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteProductCategory(arg: Pick<IProductCategory, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.productCategory}/delete/${arg._id}`
      );
      const result: Omit<
        IProductCategoryDeleteResultApi,
        "isDeletingProductCategory"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new ProductCategoryApi();
