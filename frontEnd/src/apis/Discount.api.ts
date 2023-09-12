
import { IDiscount } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { getErrorMessage, http } from "@/utils";
import { PATH_API_V1 } from "@/constant";
import { IApi } from "@/helpers";

class DiscountApi {
  async createDiscount(
    args: Omit<IDiscount, "_id" | "discount_productIds">
  ): Promise<IApi> {
    try {
      const response = await http.post(`${PATH_API_V1.discount}/create`, args);
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      console.log(error);
      throw new Error(getErrorMessage(error));
    }
  }
  async getOneDiscount(args: Pick<IDiscount, "_id">): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.discount}/getById/${args._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async getAllDiscounts(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.discount}/getAll`, {
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
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async searchDiscounts(
    fieldsQuery: Partial<IArgsQuery> & { keySearch: string }
  ) {
    try {
      const response = await http.get(`${PATH_API_V1.discount}/create`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          numericFilters: fieldsQuery.numericFilters,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
  async updateDiscount(args: Partial<IDiscount>): Promise<IApi> {
    const { _id, ...dataUpdate } = args;
    try {
      const response = await http.patch(
        `${PATH_API_V1.discount}/update/${_id}`,
        dataUpdate
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteDiscount(args: Pick<IDiscount, "_id">): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.discount}/delete/${args._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new DiscountApi();
