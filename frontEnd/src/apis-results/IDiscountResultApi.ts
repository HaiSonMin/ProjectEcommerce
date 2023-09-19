import IApi from "@/helpers/IApi";
import { IDiscount } from "@/interfaces";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IDiscountCreateResultApi extends IApi {
  isCreatingDiscount: boolean;
  metadata: IDiscount | undefined;
  createDiscount: UseMutateFunction<
    IApi,
    any,
    Omit<IDiscount, "_id" | "discount_productIds">
  >;
}

export interface IDiscountGetOneResultApi extends IApi {
  isGettingDiscount: boolean;
  metadata: IDiscount | undefined;
}

export interface IDiscountGetAllResultApi extends IApi {
  isGettingDiscounts: boolean;
  metadata:
    | {
        totalDiscounts: number;
        discountsPerPage: number;
        discounts: Array<IDiscount>;
      }
    | undefined;
}

export interface IDiscountSearchResultApi extends IApi {
  isSearchingDiscounts: boolean;
  metadata:
    | {
        totalDiscounts: number;
        discountsPerPage: number;
        discounts: Array<IDiscount>;
      }
    | undefined;
}

export interface IDiscountUpdateResultApi extends IApi {
  isUpdatingDiscount: boolean;
  metadata: IDiscount | undefined;
  updateDiscount: UseMutateFunction<any, unknown, Partial<IDiscount>>;
}

export interface IDiscountAddProductResultApi extends IApi {
  isAddingProduct: boolean;
  metadata: IDiscount | undefined;
  addDiscountToProduct: UseMutateFunction<any, unknown, Pick<IDiscount, "_id">>;
}

export interface IDiscountDeleteResultApi extends IApi {
  isDeletingDiscount: boolean;
  metadata: IDiscount | undefined;
  deleteDiscount: UseMutateFunction<any, unknown, Pick<IDiscount, "_id">>;
}
