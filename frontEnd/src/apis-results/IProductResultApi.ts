import { IProduct } from "@/interfaces";
import IApi from "@/helpers/IApi";
import { UseMutateFunction } from "@tanstack/react-query";

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

export interface IProductCreateResultApi extends IApi {
  isCreatingProduct: boolean;
  metadata: IProduct | undefined;
  createProduct: UseMutateFunction<any, unknown, Partial<IProduct>>;
}

export interface IProductGetOneResultApi extends IApi {
  isGettingProduct: boolean;
  metadata: IProduct | undefined;
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

export interface IProductSearchResultApi
  extends Omit<IProductGetAllResultApi, "isGettingProducts"> {
  isSearchingProducts: boolean;
}

export interface IProductUpdateResultApi extends IApi {
  isUpdatingProduct: boolean;
  metadata: IProduct;
  updateProduct: UseMutateFunction<any, unknown, Partial<IProduct>>;
}

export interface IProductDeleteResultApi extends IApi {
  isDeletingProduct: boolean;
  metadata: IProduct | undefined;
  deleteProduct: UseMutateFunction<any, unknown, Pick<IProduct, "_id">>;
}
