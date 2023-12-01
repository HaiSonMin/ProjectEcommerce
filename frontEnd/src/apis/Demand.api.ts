import { IArgsQuery } from '@/interfaces/shared/IArgsQuery.interface';
import { IDemand, IProductCategory } from '@/interfaces/models';
import { getErrorMessage, http, resultAppendFormData } from '@/utils';
import { PATH_API_V1 } from '@/constant/path-api';
import { IApi } from '@/interfaces/shared';

class IDemandApi {
  async createDemand(args: Omit<IDemand, '_id'>): Promise<IApi> {
    try {
      const response = await http.postForm(
        `${PATH_API_V1.demand}/create`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllDemands(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.demand}/getAll`, {
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

  async getDemandById({ _id: demandId }: Pick<IDemand, '_id'>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.demand}/getById/${demandId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getDemandsByProductCategoryId({
    _id: productCategoryId,
  }: Pick<IProductCategory, '_id'>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.demand}/getByProductCategoryId/${productCategoryId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchDemands(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.demand}/search`, {
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

  async updateDemand(args: Partial<IDemand>): Promise<IApi> {
    try {
      const response = await http.patchForm(
        `${PATH_API_V1.demand}/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteDemand(arg: Pick<IDemand, '_id'>): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.demand}/delete/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new IDemandApi();
