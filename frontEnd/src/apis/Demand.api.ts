import {
  IDemandCreateResultApi,
  IDemandGetAllResultApi,
  IDemandGetByIdResultApi,
  IDemandUpdateResultApi,
  IDemandDeleteResultApi,
  IDemandGetByProductCategoryIdResultApi,
} from "@/api-types/IDemandResultApi";
import IArgsQuery from "@/helpers/IArgsQuery";
import { IDemand, IProductCategory } from "@/interfaces";
import { CONSTANT, getErrorMessage, http, resultAppendFormData } from "@/utils";

class IDemandApi {
  async createDemand(args: Omit<IDemand, "_id">) {
    try {
      const response = await http.postForm(
        `${CONSTANT.PATH_V1_API.demand}/create`,
        resultAppendFormData(args)
      );
      const result: Omit<IDemandCreateResultApi, "isCreatingDemand"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllDemands(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.demand}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: Omit<IDemandGetAllResultApi, "isGettingDemands"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getDemandById({ _id: demandId }: Pick<IDemand, "_id">) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.demand}/getById/${demandId}`
      );
      const result: Omit<IDemandGetByIdResultApi, "isGettingDemand"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getDemandsByProductCategoryId({
    _id: productCategoryId,
  }: Pick<IProductCategory, "_id">) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.demand}/getByProductCategoryId/${productCategoryId}`
      );
      const result: Omit<
        IDemandGetByProductCategoryIdResultApi,
        "isGettingDemands"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateDemand(args: Partial<IDemand>) {
    try {
      const response = await http.patchForm(
        `${CONSTANT.PATH_V1_API.demand}/update/${args._id}`,
        resultAppendFormData(args)
      );
      const result: Omit<IDemandUpdateResultApi, "isUpdatingDemand"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteDemand(arg: Pick<IDemand, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.demand}/delete/${arg._id}`
      );
      const result: Omit<IDemandDeleteResultApi, "isDeletingDemand"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default new IDemandApi();
