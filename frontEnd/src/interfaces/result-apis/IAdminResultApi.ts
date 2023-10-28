import IApi from '@/interfaces/shared/IApi.interface';
import IUser from '@/interfaces/models/user.interface';
import { UseMutateFunction } from '@tanstack/react-query';
import { IAuthRegister } from '@/interfaces/models/auth.interface';

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

export interface IAdminCreateUserResultApi extends IApi {
  isCreatingUser: boolean;
  metadata: IUser | undefined;
  createUser: UseMutateFunction<IApi, any, IAuthRegister>;
}

export interface IAdminGetAllUserResultApi extends IApi {
  isGettingUsers: boolean;
  metadata:
    | {
        totalUsers: number;
        usersPerPage: number;
        users: Array<IUser>;
      }
    | undefined;
}

export interface IAdminSearchUserResultApi extends IApi {
  isSearchingUsers: boolean;
  metadata:
    | {
        totalUsers: number;
        usersPerPage: number;
        users: Array<IUser>;
      }
    | undefined;
}

export interface IAdminUpdateUserResultApi extends IApi {
  isUpdatingUser: boolean;
  metadata: IUser | undefined;
  updateUser: UseMutateFunction<any, unknown, Partial<IUser>>;
}

export interface IAdminDeleteUserResultApi extends IApi {
  isDeletingUser: boolean;
  metadata: IUser | undefined;
  deleteUser: UseMutateFunction<any, unknown, Pick<IUser, '_id'>>;
}
