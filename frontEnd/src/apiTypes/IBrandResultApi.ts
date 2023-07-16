import { UseMutateFunction } from "@tanstack/react-query";
import { TypeApi } from "../helpers/TypeApi";
import { BrandType } from "../featureTypes";

export interface ITypeBrandResultGet extends TypeApi {
  isGettingBrand: boolean;
}

export interface ITypeBrandResultGetOne extends ITypeBrandResultGet {
  metadata: BrandType;
}

export interface ITypeBrandResultGetAll extends ITypeBrandResultGet {
  metadata: {
    totalBrands: number;
    brandsPerPage: number;
    brands: Array<BrandType>;
  };
}

export interface ITypeBrandResultCreate extends TypeApi {
  isCreatingBrand: boolean;
  metadata: BrandType;
  createBrand: UseMutateFunction<TypeApi, any, Omit<BrandType, "_id">>;
}

export interface ITypeBrandResultUpdate extends TypeApi {
  isUpdatingBrand: boolean;
  metadata: BrandType;
  updateBrand: UseMutateFunction<TypeApi, any, BrandType>;
}

export interface ITypeBrandResultDelete extends TypeApi {
  isDeletingBrand: boolean;
  metadata: BrandType;
  deleteBrand: UseMutateFunction<TypeApi, any, Pick<BrandType, "_id">>;
}
