import IApi from "@/helpers/IApi";
import { IProductCategory } from "@/interfaces";
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

export interface IProductCategoryGetAllResultApi extends IApi {
  isGettingProductCategory: boolean;
  metadata:
    | {
        totalProductCategories: number;
        productCategoriesPerPage: number;
        productCategories: Array<IProductCategory>;
      }
    | undefined;
}

export interface IProductCategoryCreateResultApi extends IApi {
  isCreatingProductCategory: boolean;
  metadata: IProductCategory | undefined;
  createProductCategory: UseMutateFunction<
    IApi,
    any,
    Omit<IProductCategory, "_id">
  >;
}

export interface IProductCategoryUpdateResultApi extends IApi {
  isUpdatingProductCategory: boolean;
  metadata: IProductCategory | undefined;
  updateProductCategory: UseMutateFunction<IApi, any, IProductCategory>;
}

export interface IProductCategoryDeleteResultApi extends IApi {
  isDeletingProductCategory: boolean;
  metadata: IProductCategory | undefined;
  deleteProductCategory: UseMutateFunction<
    IApi,
    any,
    Pick<IProductCategory, "_id">
  >;
}
