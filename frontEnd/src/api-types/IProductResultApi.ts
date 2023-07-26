import { IProduct } from "@/interfaces";
import IApi from "@/helpers/IApi";
import { UseMutateFunction } from "@tanstack/react-query";
import {
  IProductCreate,
  IProductMainInfo,
  IProductUpdateBasic,
} from "@/interfaces/product.interface";

/**
 *  ------- available -------
 *  message
 *  metadata
 *  reasonStatusCode
 *  statusCode
 *  ------- optional(customer) -------
 *  isGetting
 *  isCreating
 *  isUpdating
 *  isDeleting
 *  create
 *  update
 *  delete
 */
export interface IProductGetOneResultApi extends IApi {
  isGettingProduct: boolean;
  metadata: IProduct | undefined;
}

export interface IProductMainInfoGetOneResultApi extends IApi {
  isGettingProduct: boolean;
  metadata: IProductMainInfo | undefined;
}

export interface IProductGetAllResultApi extends IApi {
  isGettingProducts: boolean;
  metadata:
    | {
        totalProducts: number;
        productsPerPage: number;
        products: Array<IProduct>;
      }
    | undefined;
}

export interface IProductCreateResultApi extends IApi {
  isCreatingProduct: boolean;
  metadata: IProduct | undefined;
  createProduct: UseMutateFunction<IApi, any, IProductCreate>;
}

export interface IProductProvideMainInfoResultApi extends IApi {
  isAddingProduct: boolean;
  metadata: IProductMainInfo | undefined;
  provideProductMainInfo: UseMutateFunction<IApi, any, IProductMainInfo>;
}

export interface IProductUpdateBasicResultApi extends IApi {
  isUpdatingProduct: boolean;
  metadata: IProduct | undefined;
  updateProductBasic: UseMutateFunction<IApi, any, IProductUpdateBasic>;
}

export interface IProductMainInfoUpdateResultApi extends IApi {
  isUpdatingProduct: boolean;
  metadata: IProductMainInfo | undefined;
  updateProductMainInfo: UseMutateFunction<IApi, any, IProductMainInfo>;
}

export interface IProductMainInfoDeleteResultApi extends IApi {
  isDeletingProduct: boolean;
  metadata: IProductMainInfo | undefined;
  deleteProductMainInfo: UseMutateFunction<
    IApi,
    any,
    Pick<IProductMainInfo, "_id">
  >;
}

export interface IProductDeleteResultApi extends IApi {
  isDeletingProduct: boolean;
  metadata: IProduct | undefined;
  deleteProduct: UseMutateFunction<IApi, any, Pick<IProduct, "_id">>;
}
