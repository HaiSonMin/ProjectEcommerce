import { IProductCategory } from "@/interfaces/models";
import IArgsQuery from "@/interfaces/shared/IArgsQuery.interface";
import { getErrorMessage, http, resultAppendFormData } from "@/utils";
import { PATH_API_V1 } from "@/constant/path-api";
import { IApi } from "@/interfaces/shared";

class ProductCategoryApi {
  async createProductCategory(
    args: Omit<IProductCategory, "_id">
  ): Promise<IApi> {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.productCategory}/create`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async getAllProductCategories(
    fieldsQuery: Partial<IArgsQuery>
  ): Promise<IApi> {
    console.log("fieldsQuery:::", fieldsQuery);
    try {
      const response = await http.get(`${PATH_API_V1.productCategory}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchCategories(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.productCategory}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoryById({
    _id: categoryId,
  }: Pick<IProductCategory, "_id">): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategory}/getById/${categoryId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoryByGroupId({
    productCategory_group: groupId,
  }: Pick<IProductCategory, "productCategory_group">): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategory}/getByGroupId/${groupId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoriesByIds(
    categoriesIds: Array<string> | undefined
  ): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategory}/getByIds`,
        {
          params: {
            productCategoriesIds: categoriesIds?.toString(),
          },
        }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateProductCategory(args: Partial<IProductCategory>): Promise<IApi> {
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.productCategory}/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteProductCategory({
    _id,
  }: Pick<IProductCategory, "_id">): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.productCategory}/delete/${_id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new ProductCategoryApi();
