import { UseMutateFunction } from "@tanstack/react-query";
import IApi from "@/helpers/IApi";
import { IBrand } from "@/interfaces";

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

export interface IBrandGetAllResultApi extends IApi {
  isGettingBrands: boolean;
  metadata:
    | {
        totalBrands: number;
        brandsPerPage: number;
        brands: Array<IBrand>;
      }
    | undefined;
}

export interface IBrandCreateResultApi extends IApi {
  isCreatingBrand: boolean;
  metadata: IBrand | undefined;
  createBrand: UseMutateFunction<IApi, any, Omit<IBrand, "_id">>;
}

export interface IBrandUpdateResultApi extends IApi {
  isUpdatingBrand: boolean;
  metadata: IBrand | undefined;
  updateBrand: UseMutateFunction<IApi, any, IBrand>;
}

export interface IBrandDeleteResultApi extends IApi {
  isDeletingBrand: boolean;
  metadata: IBrand | undefined;
  deleteBrand: UseMutateFunction<IApi, any, Pick<IBrand, "_id">>;
}
