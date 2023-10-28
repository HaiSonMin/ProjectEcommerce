import { IApi } from '@/interfaces/shared';
import {
  IAuth,
  IAuthCreateSessionOTP,
  IAuthLogin,
  IAuthRegister,
} from '@/interfaces/models/auth.interface';
import { UseMutateFunction } from '@tanstack/react-query';
import IUser from '@/interfaces/models/user.interface';

export interface IAuthLoginGoogleResultApi extends IApi {
  isLoginGoogle: boolean;
  metadata: {
    user: Pick<IUser, '_id' | 'user_email' | 'user_fullName' | 'user_role'>;
    accessToken: string;
  };
}

export interface IAuthLoginResultApi extends IApi {
  isLogin: boolean;
  metadata: {
    user: Pick<IUser, '_id' | 'user_email' | 'user_fullName' | 'user_role'>;
    accessToken: string;
  };
  login: UseMutateFunction<any, unknown, IAuthLogin>;
}

export interface IAuthLogoutResultApi extends IApi {
  isLogout: boolean;
  metadata: any;
  logout: UseMutateFunction<any, unknown>;
}

export interface IAuthGenerateOTPResultApi extends IApi {
  isGeneratingOTP: boolean;
  metadata: string; // "Vui lòng kiểm tra email đã điền trước đó"
  generateOTP: UseMutateFunction<any, unknown, IAuthCreateSessionOTP>;
}

export interface IAuthCreateSessionRegisterResultApi extends IApi {
  isCreatingSessionRegister: boolean;
  metadata: string; // "Vui lòng kiểm tra email ..."
  createSessionRegister: UseMutateFunction<any, unknown, IAuthRegister>;
}

export interface IAuthConfirmRegisterResultApi extends IApi {
  isConfirmingRegister: boolean;
  metadata: IAuthRegister;
  confirmRegister: UseMutateFunction<any, unknown, Pick<IAuth, 'OTPCode'>>;
}

export interface IAuthCreateSessionResetPasswordResultApi extends IApi {
  isCreatingSessionResetPassword: boolean;
  metadata: string; // "Vui lòng kiểm tra email ..."
  createSessionResetPassword: UseMutateFunction<
    any,
    unknown,
    Pick<IUser, 'user_email'>
  >;
}

export interface IAuthConfirmOTPResetPasswordResultApi extends IApi {
  isConfirmingOTPResetPassword: boolean;
  metadata: string; // "Đổi mật khẩu thành công"
  confirmOTPResetPassword: UseMutateFunction<
    any,
    unknown,
    Pick<IAuth, 'OTPCode'>
  >;
}

export interface IAuthConfirmResetPasswordResultApi extends IApi {
  isConfirmingResetPassword: boolean;
  metadata: string; // "Vui lòng kiểm tra email ..."
  confirmResetPassword: UseMutateFunction<
    any,
    unknown,
    Pick<IAuthRegister, 'user_password' | 'user_confirmPassword'>
  >;
}

export interface IAuthRefreshATResultApi extends IApi {
  isRefreshingToken: boolean;
  metadata: { user: IUser; newAccessToken: string };
  refreshAT: UseMutateFunction<any, unknown>;
}
