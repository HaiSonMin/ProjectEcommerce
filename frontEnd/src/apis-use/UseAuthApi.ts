import {
  IAuthLoginResultApi,
  IAuthLogoutResultApi,
  IAuthRefreshATResultApi,
  IAuthGenerateOTPResultApi,
  IAuthConfirmRegisterResultApi,
  IAuthConfirmResetPasswordResultApi,
  IAuthCreateSessionRegisterResultApi,
  IAuthConfirmOTPResetPasswordResultApi,
  IAuthCreateSessionResetPasswordResultApi,
  IAuthLoginGoogleResultApi,
} from "@/apis-results/IAuthResultApi";
import { AuthApi } from "@/apis";
import CONSTANT from "@/constant/value-constant";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default class UseAuthApi {
  static loginGoogle(): IAuthLoginGoogleResultApi {
    const { data, isLoading } = useQuery({
      queryKey: ["user"],
      queryFn: () => AuthApi.loginGoogle(),
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      isLoginGoogle: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

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
        localStorage.removeItem(CONSTANT.AT_NAME_LOCAL_STORE);
        localStorage.removeItem(CONSTANT.USER_NAME_LOCAL_STORE);
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

  static generateOTP(): IAuthGenerateOTPResultApi {
    const { data, isLoading, mutate } = useMutation({
      mutationFn: AuthApi.generateOTP,
      onSuccess: (data) => toast.success(data.metadata),
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
    return {
      generateOTP: mutate,
      isGeneratingOTP: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static createSessionRegister(): IAuthCreateSessionRegisterResultApi {
    const { data, isLoading, mutate } = useMutation({
      mutationFn: AuthApi.createSessionRegister,
      onSuccess: (data) => toast.success(data.metadata),
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
    return {
      createSessionRegister: mutate,
      isCreatingSessionRegister: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static confirmRegister(): IAuthConfirmRegisterResultApi {
    const { data, isLoading, mutate } = useMutation({
      mutationFn: AuthApi.confirmRegister,
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => {
        toast.error(error.message);
      },
    });
    return {
      confirmRegister: mutate,
      isConfirmingRegister: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static createSessionResetPassword(): IAuthCreateSessionResetPasswordResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.createSessionResetPassword,
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => toast.error(error.message),
    });
    return {
      createSessionResetPassword: mutate,
      isCreatingSessionResetPassword: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static confirmOTPResetPassword(): IAuthConfirmOTPResetPasswordResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.confirmOTPResetPassword,
      onSuccess: (data) => toast.success(data.message),
      onError: (error: any) => toast.error(error.message),
    });
    return {
      confirmOTPResetPassword: mutate,
      isConfirmingOTPResetPassword: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static confirmResetPassword(): IAuthConfirmResetPasswordResultApi {
    const { data, mutate, isLoading } = useMutation({
      mutationFn: AuthApi.confirmResetPassword,
      onSuccess: (data) => toast.success(data.message),
      onError: () => toast.error("Chưa xác thực OTP, thao tác thất bại"),
    });
    return {
      confirmResetPassword: mutate,
      isConfirmingResetPassword: isLoading,
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
      isRefreshingToken: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
