import { IApi } from "@/helpers";
import { IUser } from "@/interfaces";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IAdminGetOneUserResultApi extends IApi {
  isGettingUser: boolean;
  metadata: IUser | undefined;
}

export interface IUserUpdateResultApi extends IApi {
  isUpdating: boolean;
  metadata: IUser;
  updateUser: UseMutateFunction<any, unknown, Partial<IUser>>;
}
