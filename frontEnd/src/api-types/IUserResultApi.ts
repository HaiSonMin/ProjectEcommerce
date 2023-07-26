import { UseMutateFunction } from "@tanstack/react-query";
import IApi from "@/helpers/IApi";
import { IUser } from "@/interfaces";
import { IUserCreate } from "@/interfaces/user.interface";

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

export interface IUserCreateResultApi extends IApi {
  isCreatingUser: boolean;
  metadata: IUser | undefined;
  createUser: UseMutateFunction<
    IApi,
    any,
    Omit<IUserCreate, "_id" | "user_isBlocking">
  >;
}

export interface IUserGetOneResultApi extends IApi {
  isGettingUser: boolean;
  metadata: IUser | undefined;
}

export interface IUserGetAllResultApi extends IApi {
  isGettingUsers: boolean;
  metadata:
    | {
        totalUsers: number;
        usersPerPage: number;
        users: Array<IUser>;
      }
    | undefined;
}

export interface IUserSearchResultApi extends IApi {
  isSearchingUsers: boolean;
  metadata:
    | {
        totalUsers: number;
        usersPerPage: number;
        users: Array<IUser>;
      }
    | undefined;
}

export interface IUserUpdateResultApi extends IApi {
  isUpdatingUser: boolean;
  metadata: IUser | undefined;
  updateUser: UseMutateFunction<IApi, any, Partial<IUser>>;
}

export interface IUserDeleteResultApi extends IApi {
  isDeletingUser: boolean;
  metadata: IUser | undefined;
  deleteUser: UseMutateFunction<IApi, any, Pick<IUser, "_id">>;
}
