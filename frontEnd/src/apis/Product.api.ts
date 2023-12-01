import { IApi } from '@/interfaces/shared';
import { PATH_API_V1 } from '@/constant/path-api';
import { IArgsQuery } from '@/interfaces/shared/IArgsQuery.interface';
import { http, getErrorMessage, resultAppendFormDataRecursive } from '@/utils';
import { IProduct } from '@/interfaces/models/product.interface';

class ProductApi {
  async createProduct(args: Partial<IProduct>): Promise<IApi> {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.product}/create`,
        resultAppendFormDataRecursive(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      console.error(error);
      throw new Error(getErrorMessage(error));
    }
  }

  async getProductById(arg: Pick<IProduct, '_id'>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.product}/getById/${arg._id}`
      );

      const result: IApi = response.data;
      console.log('resultProduct:::', result);

      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllProducts(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.product}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          status: fieldsQuery.status,
          numericFilters: fieldsQuery.numericFilters,
        },
      });

      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getProductsByCategoryId(
    categoryId: string,
    fieldsQuery: Partial<IArgsQuery>
  ): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.product}/getByCategoryId/${categoryId}`,
        {
          params: {
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
            numericFilters: fieldsQuery.numericFilters,
          },
        }
      );

      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchProducts(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.product}/search`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          keySearch: fieldsQuery.keySearch,
          numericFilters: fieldsQuery.numericFilters,
        },
      });

      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateProduct(args: Partial<IProduct>): Promise<IApi> {
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.product}/update/${args._id}`,
        resultAppendFormDataRecursive(args)
      );

      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteProduct(arg: Pick<IProduct, '_id'>): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.product}/delete/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new ProductApi();
