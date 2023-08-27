import {
  IDiscountCreateResultApi,
  IDiscountGetOneResultApi,
  IDiscountGetAllResultApi,
  IDiscountSearchResultApi,
  IDiscountUpdateResultApi,
  IDiscountDeleteResultApi,
} from "@/api-types/IDiscountResultApi";
import { IDiscount } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { getErrorMessage, http } from "@/utils";
import { PATH_API_V1 } from "@/constant";

class DiscountApi {
  async createDiscount(args: Omit<IDiscount, "_id" | "discount_productIds">) {
    try {
      const response = await http.post(
        `${PATH_API_V1.discount}/create`,
        args
      );
      const result: Omit<IDiscountCreateResultApi, "isCreatingDiscount"> =
        response.data;
      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(getErrorMessage(error));
    }
  }
  async getOneDiscount(args: Pick<IDiscount, "_id">) {
    try {
      const response = await http.get(
        `${PATH_API_V1.discount}/getById/${args._id}`
      );
      const result: Omit<IDiscountGetOneResultApi, "isGettingDiscount"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async getAllDiscounts(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(
        `${PATH_API_V1.discount}/getAll`,
        {
          params: {
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
            status: fieldsQuery.status,
            numericFilters: fieldsQuery.numericFilters,
          },
        }
      );
      const result: Omit<IDiscountGetAllResultApi, "isGettingDiscounts"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async searchDiscounts(
    fieldsQuery: Partial<IArgsQuery> & { keySearch: string }
  ) {
    try {
      const response = await http.get(
        `${PATH_API_V1.discount}/create`,
        {
          params: {
            keySearch: fieldsQuery.keySearch,
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
            numericFilters: fieldsQuery.numericFilters,
          },
        }
      );
      const result: Omit<IDiscountSearchResultApi, "isSearchingDiscounts"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async updateDiscount(args: Partial<IDiscount>) {
    const { _id, ...dataUpdate } = args;
    try {
      const response = await http.patch(
        `${PATH_API_V1.discount}/update/${_id}`,
        dataUpdate
      );
      const result: Omit<IDiscountUpdateResultApi, "isUpdatingDiscount"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteDiscount(args: Pick<IDiscount, "_id">) {
    try {
      const response = await http.delete(
        `${PATH_API_V1.discount}/delete/${args._id}`
      );
      const result: Omit<IDiscountDeleteResultApi, "isDeletingDiscount"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new DiscountApi();
