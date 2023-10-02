import {
  IOrderCreateResultApi,
  IOrderGetAllResultApi,
  IOrderSearchResultApi,
  IOrderGetOneResultApi,
  IOrderUpdateResultApi,
  IOrderDeleteResultApi,
} from "@/apis-results/IOrderResultApi";
import { IOrder } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import {  getErrorMessage, http } from "@/utils";
import { PATH_API_V1 } from "@/constant/path-api";

class OrderApi {
  async createOrder(args: Partial<IOrder>) {
    try {
      const response = await http.post(
        `${PATH_API_V1.order}/create`,
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
        `${PATH_API_V1.order}/getById/${arg._id}`
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
      const response = await http.get(`${PATH_API_V1.order}/getAll`, {
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
      const response = await http.get(`${PATH_API_V1.order}/search`, {
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
        `${PATH_API_V1.order}/update/${args._id}`
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
        `${PATH_API_V1.order}/delete/${arg._id}`
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
