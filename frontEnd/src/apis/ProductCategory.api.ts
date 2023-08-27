import {
  IProductCategoriesGetMulti,
  IProductCategoryCreateResultApi,
  IProductCategoryUpdateResultApi,
  IProductCategoryGetAllResultApi,
  IProductCategoryGetByIdResultApi,
  IProductCategoryDeleteResultApi,
} from "@/api-types/IProductCategoryResultApi";
import { IProductCategory } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { getErrorMessage, http, resultAppendFormData } from "@/utils";
import { PATH_API_V1 } from "@/constant";

class ProductCategoryApi {
  async createProductCategory(args: Omit<IProductCategory, "_id">) {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.productCategory}/create`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductCategoryCreateResultApi,
        "isCreatingProductCategory"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async getAllProductCategories(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${PATH_API_V1.productCategory}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: Omit<
        IProductCategoryGetAllResultApi,
        "isGettingProductCategories"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchCategories(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${PATH_API_V1.productCategory}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
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
        `${PATH_API_V1.productCategory}/getById/${categoryId}`
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

  async getProductCategoryByGroupId({
    productCategory_group: groupId,
  }: Pick<IProductCategory, "productCategory_group">) {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategory}/getByGroupId/${groupId}`
      );
      const result: Omit<
        IProductCategoriesGetMulti,
        "isGettingProductCategories"
      > = response.data;
      console.log(result);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoriesByIds(categoriesIds: Array<string> | undefined) {
    console.log("categoriesIds:::", categoriesIds);
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategory}/getByIds`,
        {
          params: {
            productCategoriesIds: categoriesIds?.toString(),
          },
        }
      );
      const result: Omit<
        IProductCategoriesGetMulti,
        "isGettingProductCategories"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateProductCategory(args: IProductCategory) {
    console.log(args);
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.productCategory}/update/${args._id}`,
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
        `${PATH_API_V1.productCategory}/delete/${arg._id}`
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
