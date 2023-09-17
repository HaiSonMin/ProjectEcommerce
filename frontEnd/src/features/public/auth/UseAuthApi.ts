import {
  IAuthForgotPasswordResultApi,
  IAuthLoginResultApi,
  IAuthLogoutResultApi,
  IAuthRefreshATResultApi,
  IAuthRegisterResultApi,
  IAuthResetPasswordResultApi,
} from "@/api-types/IAuthResultApi";
import { AuthApi } from "@/apis";
import CONSTANT from "@/constant/value-constant";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default class UseAuthApi {
  static login(): IAuthLoginResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.login,
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      login: mutate,
      isLogin: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static logout(): IAuthLogoutResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.logout,
      onSuccess: (data) => {
        localStorage.removeItem(CONSTANT.USER_TOKEN_NAME);
        toast.success(data.message);
      },
      onError: () => toast.error("Thao tát thất bại"),
    });

    return {
      logout: mutate,
      isLogout: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static register(): IAuthRegisterResultApi {
    const { data, isLoading, mutate } = useMutation({
      mutationFn: AuthApi.register,
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
    return {
      register: mutate,
      isRegistering: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static refreshAT(): IAuthRefreshATResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.refreshAT,
      onSuccess: (data) => toast.success(data.message),
      onError: () => toast.success("Refresh Token thất bại"),
    });
    return {
      refreshAT: mutate,
      isRefreshing: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static forgotPassword(): IAuthForgotPasswordResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.forgotPassword,
      onSuccess: (data) => toast.success(data.message),
      onError: () => toast.success("Thao tác thất bại"),
    });
    return {
      forgotPassword: mutate,
      isForgot: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static resetPassword(): IAuthResetPasswordResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.resetPassword,
      onSuccess: (data) => toast.success(data.message),
      onError: () => toast.success("Reset mật khẩu thất bại"),
    });
    return {
      resetPassword: mutate,
      isResettingPassword: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
