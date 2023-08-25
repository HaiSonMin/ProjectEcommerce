import IArgsQuery from "@/helpers/IArgsQuery";
import { IProductCategoryGroup } from "@/interfaces";
import { http, resultAppendFormData } from "@/utils";
import {
  IProductCategoryGroupCreateResultApi,
  IProductCategoryGroupUpdateResultApi,
  IProductCategoryGroupGetByIdResultApi,
  IProductCategoryGroupGetAllResultApi,
  IProductCategoryGroupDeleteResultApi,
} from "@/api-types/IProductCategoryGroupResultApi";
import { PATH_API_V1 } from "@/constant";

class ProductCategoryGroupApi {
  async createProductCategoryGroup(args: Omit<IProductCategoryGroup, "_id">) {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.productCategoryGroup}/create`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductCategoryGroupCreateResultApi,
        "isCreatingProductCategoryGroup"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getAllProductCategoriesGroup(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategoryGroup}/getAll`,
        {
          params: {
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
          },
        }
      );
      const result: Omit<
        IProductCategoryGroupGetAllResultApi,
        "isGettingProductCategoriesGroup"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoryGroupById({
    _id: categoryGroupId,
  }: Pick<IProductCategoryGroup, "_id">) {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategoryGroup}/getById/${categoryGroupId}`
      );
      const result: Omit<
        IProductCategoryGroupGetByIdResultApi,
        "isGettingProductCategoryGroup"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateProductCategoryGroup(args: IProductCategoryGroup) {
    console.log(args);
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.productCategoryGroup}/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IProductCategoryGroupUpdateResultApi,
        "isUpdatingProductCategoryGroup"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteProductCategoryGroup(arg: Pick<IProductCategoryGroup, "_id">) {
    try {
      const response = await http.delete(
        `${PATH_API_V1.productCategoryGroup}/delete/${arg._id}`
      );
      const result: Omit<
        IProductCategoryGroupDeleteResultApi,
        "isDeletingProductCategoryGroup"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new ProductCategoryGroupApi();
