import {IProductCategory} from "@/interfaces/models/productCategory.interface";
import {IApi} from "@/interfaces/shared/IApi.interface";
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
  isGettingProductCategories: boolean;
  metadata:
    | {
        totalProductCategories: number;
        productCategoriesPerPage: number;
        productCategories: Array<IProductCategory>;
      }
    | undefined;
}

export interface IProductCategorySearchResultApi
  extends Omit<IProductCategoryGetAllResultApi, "isGettingProductCategories"> {
  isSearchingProductCategories: boolean;
}

export interface IProductCategoryGetByIdResultApi extends IApi {
  isGettingProductCategory: boolean;
  metadata: IProductCategory | undefined;
}

export interface IProductCategoriesGetMulti extends IApi {
  isGettingProductCategories: boolean;
  metadata: Array<IProductCategory> | undefined;
}

export interface IProductCategoryCreateResultApi extends IApi {
  isCreatingProductCategory: boolean;
  metadata: IProductCategory | undefined;
  createProductCategory: UseMutateFunction<
    any,
    unknown,
    Omit<IProductCategory, "_id">
  >;
}

export interface IProductCategoryUpdateResultApi extends IApi {
  isUpdatingProductCategory: boolean;
  metadata: IProductCategory | undefined;
  updateProductCategory: UseMutateFunction<
    any,
    unknown,
    Partial<IProductCategory>
  >;
}

export interface IProductCategoryDeleteResultApi extends IApi {
  isDeletingProductCategory: boolean;
  metadata: IProductCategory | undefined;
  deleteProductCategory: UseMutateFunction<
    any,
    unknown,
    Pick<IProductCategory, "_id">
  >;
}
