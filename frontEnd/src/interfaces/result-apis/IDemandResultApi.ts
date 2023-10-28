import IDemand from "@/interfaces/models/demand.interface";
import IApi from "@/interfaces/shared/IApi.interface";
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

export interface IDemandGetAllResultApi extends IApi {
  isGettingDemands: boolean;
  metadata:
    | {
        totalDemands: number;
        demandsPerPage: number;
        demands: Array<IDemand>;
      }
    | undefined;
}

export interface IDemandGetByIdResultApi extends IApi {
  isGettingDemand: boolean;
  metadata: IDemand | undefined;
}

export interface IDemandGetByProductCategoryIdResultApi extends IApi {
  isGettingDemands: boolean;
  metadata: Array<IDemand> | undefined;
}

export interface IDemandsSearchResultApi extends IApi {
  isSearchingDemands: boolean;
  metadata:
    | {
        totalDemands: number;
        demandsPerPage: number;
        demands: Array<IDemand>;
      }
    | undefined;
}

export interface IDemandCreateResultApi extends IApi {
  isCreatingDemand: boolean;
  metadata: IDemand | undefined;
  createDemand: UseMutateFunction<any, unknown, Omit<IDemand, "_id">>;
}

export interface IDemandUpdateResultApi extends IApi {
  isUpdatingDemand: boolean;
  metadata: IDemand | undefined;
  updateDemand: UseMutateFunction<any, unknown, Partial<IDemand>>;
}

export interface IDemandDeleteResultApi extends IApi {
  isDeletingDemand: boolean;
  metadata: IDemand | undefined;
  deleteDemand: UseMutateFunction<any, unknown, Pick<IDemand, "_id">>;
}
