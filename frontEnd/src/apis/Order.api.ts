import {
  IOrderCreateResultApi,
  IOrderGetAllResultApi,
  IOrderSearchResultApi,
  IOrderGetOneResultApi,
  IOrderUpdateResultApi,
  IOrderDeleteResultApi,
} from "@/api-types/IOrderResultApi";
import { IOrder } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { CONSTANT, getErrorMessage, http } from "@/utils";

class OrderApi {
  async createOrder(args: Partial<IOrder>) {
    try {
      const response = await http.post(
        `${CONSTANT.PATH_V1_API.order}/create`,
        args
      );
      const result: Omit<
        IOrderCreateResultApi,
        "isCreatingOrder" | "createOrder"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
  async getOneOrder(arg: Pick<IOrder, "_id">) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.order}/getById/${arg._id}`
      );
      const result: Omit<IOrderGetOneResultApi, "isGettingOrder"> =
        response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
  async getAllOrders(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.order}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          status: fieldsQuery.status,
          numericFilters: fieldsQuery.numericFilters,
        },
      });
      const result: Omit<IOrderGetAllResultApi, "isGettingOrders"> =
        response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
  async searchOrders(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.order}/search`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          status: fieldsQuery.status,
          keySearch: fieldsQuery.keySearch,
          numericFilters: fieldsQuery.numericFilters,
        },
      });
      const result: Omit<IOrderSearchResultApi, "isSearchingOrders"> =
        response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
  async updateOrder(args: Partial<IOrder>) {
    try {
      const response = await http.patch(
        `${CONSTANT.PATH_V1_API.order}/update/${args._id}`
      );
      const result: Omit<
        IOrderUpdateResultApi,
        "isUpdatingOrder" | "updateOrder"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
  async deleteOrder(arg: Pick<IOrder, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.order}/delete/${arg._id}`
      );
      const result: Omit<
        IOrderDeleteResultApi,
        "isDeletingOrder" | "deleteOrder"
      > = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new OrderApi();
