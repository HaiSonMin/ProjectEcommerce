import { IArgsQuery } from '@/interfaces/shared/IArgsQuery.interface';
import { IProductCategoryGroup } from '@/interfaces/models/productCategoryGroup.interface';
import { http, resultAppendFormData } from '@/utils';
import { PATH_API_V1 } from '@/constant/path-api';
import { IApi } from '@/interfaces/shared';

class ProductCategoryGroupApi {
  async createProductCategoryGroup(
    args: Omit<IProductCategoryGroup, '_id'>
  ): Promise<IApi> {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.productCategoryGroup}/create`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getAllProductCategoriesGroup(
    fieldsQuery: Partial<IArgsQuery>
  ): Promise<IApi> {
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
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductCategoryGroupById({
    _id: categoryGroupId,
  }: Pick<IProductCategoryGroup, '_id'>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.productCategoryGroup}/getById/${categoryGroupId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateProductCategoryGroup(
    args: Partial<IProductCategoryGroup>
  ): Promise<IApi> {
    console.log(args);
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.productCategoryGroup}/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteProductCategoryGroup(
    arg: Pick<IProductCategoryGroup, '_id'>
  ): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.productCategoryGroup}/delete/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new ProductCategoryGroupApi();
