import { CONSTANT, http, getErrorMessage, resultAppendFormData } from "@/utils";
import IArgsQuery from "@/helpers/IArgsQuery";
import { IBrand } from "@/interfaces";
import {
  IBrandCreateResultApi,
  IBrandDeleteResultApi,
  IBrandGetAllResultApi,
  IBrandUpdateResultApi,
} from "@/api-types/IBrandResultApi";

class BrandApi {
  async createBrand(args: Omit<IBrand, "_id">) {
    try {
      const response = await http.postForm(
        `${CONSTANT.PATH_V1_API.brand}/create`,
        resultAppendFormData(args)
      );
      const result: Omit<
        IBrandCreateResultApi,
        "isCreatingBrand" | "createBrand"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllBrands(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.brand}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          fields: fieldsQuery.fields,
        },
      });
      const result: Omit<IBrandGetAllResultApi, "isGettingBrand"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateBrand(args: IBrand) {
    const response = await http.patchForm(
      `${CONSTANT.PATH_V1_API.brand}/update/${args._id}`,
      resultAppendFormData(args)
    );
    const result: Omit<
      IBrandUpdateResultApi,
      "isUpdatingBrand" | "updateBrand"
    > = response.data;
    return result;
  }

  async deleteBrand(arg: Pick<IBrand, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.brand}/delete/${arg._id}`
      );
      const result: Omit<
        IBrandDeleteResultApi,
        "isDeletingBrand" | "deleteBrand"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new BrandApi();
