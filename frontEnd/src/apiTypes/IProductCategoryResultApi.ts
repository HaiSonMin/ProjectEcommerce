import { TypeApi } from "helpers/TypeApi";
import { ProductCategoryType } from "../featureTypes";
import { UseMutateFunction } from "@tanstack/react-query";

export interface ITypeProductCategoryResultGetAll extends TypeApi {
  isGettingProductCategory: boolean;
  metadata: {
    totalProductCategories: number;
    productCategoriesPerPage: number;
    productCategories: Array<ProductCategoryType>;
  };
}

export interface ITypeProductCategoryResultCreate extends TypeApi {
  isCreatingProductCategory: boolean;
  metadata: ProductCategoryType;
  createProductCategory: UseMutateFunction<
    TypeApi,
    any,
    Omit<ProductCategoryType, "_id">
  >;
}

export interface ITypeProductCategoryResultUpdate extends TypeApi {
  isUpdatingProductCategory: boolean;
  metadata: ProductCategoryType;
  updateProductCategory: UseMutateFunction<TypeApi, any, ProductCategoryType>;
}

export interface ITypeProductCategoryResultDelete extends TypeApi {
  isDeletingProductCategory: boolean;
  metadata: ProductCategoryType;
  deleteProductCategory: UseMutateFunction<
    TypeApi,
    any,
    Pick<ProductCategoryType, "_id">
  >;
}
