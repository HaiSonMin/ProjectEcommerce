import { IApi } from "@/helpers";
import { IUser } from "@/interfaces";
import { IUserCreate } from "@/interfaces/user.interface";
import { UseMutateFunction } from "@tanstack/react-query";

export interface IAuthLoginResultApi extends IApi {
  isLogin: boolean;
  metadata: { user: IUser; accessToken: string };
  login: UseMutateFunction<
    any,
    unknown,
    Pick<IUser, "user_email" | "user_password">
  >;
}

export interface IAuthLogoutResultApi extends IApi {
  isLogout: boolean;
  metadata: any;
  logout: UseMutateFunction<any, unknown>;
}

export interface IAuthRegisterResultApi extends IApi {
  isRegistering: boolean;
  metadata: { user: IUser; accessToken: string };
  register: UseMutateFunction<any, unknown, Partial<IUserCreate>>;
}

export interface IAuthRefreshATResultApi extends IApi {
  isRefreshing: boolean;
  metadata: { user: IUser; newAccessToken: string };
  refreshAT: UseMutateFunction<any, unknown>;
}

export interface IAuthForgotPasswordResultApi extends IApi {
  isForgot: boolean;
  metadata: any;
  forgotPassword: UseMutateFunction<any, unknown, Pick<IUser, "user_email">>;
}

export interface IAuthResetPasswordResultApi extends IApi {
  isResettingPassword: boolean;
  metadata: any;
  resetPassword: UseMutateFunction<
    any,
    unknown,
    Pick<IUserCreate, "user_password" | "reconfirmPassword">
  >;
}
