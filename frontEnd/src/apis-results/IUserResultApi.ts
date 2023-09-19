import { IApi } from "@/helpers";
import { IUser } from "@/interfaces";
import { IUserCreate } from "@/interfaces/user.interface";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IUserCheckResultApi extends IApi {
  isChecking: boolean;
  metadata: IUser;
  checkUser: UseMutateFunction<any, unknown, Pick<IUser, "user_email">>;
}

export interface IUserUpdateResultApi extends IApi {
  isUpdating: boolean;
  metadata: IUser;
  updateUser: UseMutateFunction<any, unknown, Partial<IUser>>;
}
