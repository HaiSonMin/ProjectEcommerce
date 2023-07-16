import {
  CONSTANT,
  getErrorMessage,
  http,
  resultAppendFormData,
} from "../utils";
import { TypeArgsQuery } from "../helpers/TypeArgsQuery";
import { BrandType } from "../featureTypes";
import {
  ITypeBrandResultCreate,
  ITypeBrandResultGetAll,
} from "apiTypes/IBrandResultApi";

class BrandApi {
  async createBrand(args: Omit<BrandType, "_id">) {
    try {
      const response = await http.postForm(
        `${CONSTANT.PATH_V1_API.brand}/create`,
        resultAppendFormData(args)
      );
      const result: Omit<
        ITypeBrandResultCreate,
        "isCreatingBrand" | "createBrand"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getBrand(arg: Pick<BrandType, "_id">) {
    const response = await http.get(
      `${CONSTANT.PATH_V1_API.brand}/getById/${arg._id}`
    );
    const result: Omit<ITypeBrandResultCreate, "isGettingBrand"> =
      response.data;

    return result;
  }

  async getAllBrands(
    fieldsQuery: Omit<TypeArgsQuery, "unFields" | "numericFilters">
  ) {
    try {
      const response = await http.get("v1/brand/getAll", {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          fields: fieldsQuery.fields,
        },
      });
      console.log(response);
      const result: Omit<ITypeBrandResultGetAll, "isGettingBrand"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateBrand(args: BrandType) {
    const response = await http.patchForm(
      `${CONSTANT.PATH_V1_API.brand}/update/${args._id}`,
      resultAppendFormData(args)
    );
    const result: Omit<
      ITypeBrandResultCreate,
      "isUpdatingBrand" | "updateBrand"
    > = response.data;
    return result;
  }

  async deleteBrand(arg: Pick<BrandType, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.brand}/delete/${arg._id}`
      );
      const result: Omit<
        ITypeBrandResultCreate,
        "isDeletingBrand" | "deleteBrand"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new BrandApi();
