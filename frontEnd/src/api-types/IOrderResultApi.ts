import IApi from "@/helpers/IApi";
import { IOrder } from "@/interfaces";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IOrderCreateResultApi extends IApi {
  isCreatingOrder: boolean;
  metadata: IOrder | undefined;
  createOrder: UseMutateFunction<IApi, any, Partial<IOrder>>;
}

export interface IOrderGetOneResultApi extends IApi {
  isGettingOrder: boolean;
  metadata: IOrder | undefined;
}

export interface IOrderGetAllResultApi extends IApi {
  isGettingOrders: boolean;
  metadata:
    | {
        orders: Array<IOrder>;
        totalOrders: number;
        ordersPerPage: number;
      }
    | undefined;
}

export interface IOrderSearchResultApi
  extends Omit<IOrderGetAllResultApi, "isGettingOrders"> {
  isSearchingOrders: boolean;
}

export interface IOrderUpdateResultApi extends IApi {
  isUpdatingOrder: boolean;
  metadata: IOrder | undefined;
  updateOrder: UseMutateFunction<any, unknown, Partial<IOrder>>;
}

export interface IOrderDeleteResultApi extends IApi {
  isDeletingOrder: boolean;
  metadata: IOrder | undefined;
  deleteOrder: UseMutateFunction<any, unknown, Pick<IOrder, "_id">>;
}
