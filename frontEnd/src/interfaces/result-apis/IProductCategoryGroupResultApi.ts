import { IProductCategoryGroup } from '@/interfaces/models/productCategoryGroup.interface';
import { IApi } from '@/interfaces/shared/IApi.interface';
import { UseMutateFunction } from '@tanstack/react-query';

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

export interface IProductCategoryGroupGetAllResultApi extends IApi {
  isGettingProductCategoriesGroup: boolean;
  metadata:
    | {
        totalProductCategoriesGroup: number;
        productCategoriesGroupPerPage: number;
        productCategoriesGroup: Array<IProductCategoryGroup>;
      }
    | undefined;
}

export interface IProductCategoryGroupGetByIdResultApi extends IApi {
  isGettingProductCategoryGroup: boolean;
  metadata: IProductCategoryGroup | undefined;
}

export interface IProductCategoryGroupCreateResultApi extends IApi {
  isCreatingProductCategoryGroup: boolean;
  metadata: IProductCategoryGroup | undefined;
  createProductCategoryGroup: UseMutateFunction<
    any,
    unknown,
    Omit<IProductCategoryGroup, '_id'>
  >;
}

export interface IProductCategoryGroupUpdateResultApi extends IApi {
  isUpdatingProductCategoryGroup: boolean;
  metadata: IProductCategoryGroup | undefined;
  updateProductCategoryGroup: UseMutateFunction<
    any,
    unknown,
    Partial<IProductCategoryGroup>
  >;
}

export interface IProductCategoryGroupDeleteResultApi extends IApi {
  isDeletingProductCategoryGroup: boolean;
  metadata: IProductCategoryGroup | undefined;
  deleteProductCategoryGroup: UseMutateFunction<
    any,
    unknown,
    Pick<IProductCategoryGroup, '_id'>
  >;
}
