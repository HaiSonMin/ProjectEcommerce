import { http, getErrorMessage, resultAppendFormData } from "@/utils";
import IArgsQuery from "@/helpers/IArgsQuery";
import { IBrand } from "@/interfaces";
import {
  IBrandCreateResultApi,
  IBrandDeleteResultApi,
  IBrandGetAllResultApi,
  IBrandUpdateResultApi,
} from "@/api-types/IBrandResultApi";
import { PATH_API_V1 } from "@/constant";
import { IApi } from "@/helpers";

class BrandApi {
  async createBrand(args: Omit<IBrand, "_id">): Promise<IApi> {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.brand}/create`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllBrands(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.brand}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          fields: fieldsQuery.fields,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchBrands(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.brand}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateBrand(args: Partial<IBrand>): Promise<IApi> {
    const response = await http.patchForm(
      `${PATH_API_V1.brand}/update/${args._id}`,
      resultAppendFormData(args)
    );
    const result: IApi = response.data;
    return result;
  }

  async deleteBrand(arg: Pick<IBrand, "_id">): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.brand}/delete/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new BrandApi();
