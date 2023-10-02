import { PATH_API_V1 } from "@/constant/path-api";
import CONSTANT from "@/constant/value-constant";
import { IApi } from "@/helpers";
import { useLocalStorageState } from "@/hooks";
import { IUser } from "@/interfaces";
import IAuth, {
  IAuthCreateSessionOTP,
  IAuthLogin,
  IAuthRegister,
  IAuthResetPassword,
} from "@/interfaces/auth.interface";
import { getATLocalStorage, getErrorMessage, http } from "@/utils";

class AuthApi {
  async loginGoogle(): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.login}/success/google`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async login(args: IAuthLogin): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.login}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async logout(): Promise<IApi> {
    const accessToken = getATLocalStorage();
    try {
      const response = await http.get(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.logout}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async generateOTP(args: IAuthCreateSessionOTP): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.generateOTP}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async createSessionRegister(args: IAuthRegister): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.createSessionRegister}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async confirmRegister(args: Pick<IAuth, "OTPCode">): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.confirmRegister}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async createSessionResetPassword(
    args: Pick<IUser, "user_email">
  ): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.createSessionResetPassword}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async confirmOTPResetPassword(args: Pick<IAuth, "OTPCode">): Promise<IApi> {
    console.log("args::::", args);
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.confirmOTPResetPassword}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async confirmResetPassword(
    args: Pick<IAuthRegister, "user_password" | "user_confirmPassword">
  ): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth.mainPath}${PATH_API_V1.auth.feature.confirmResetPassword}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async refreshAT(): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.auth}${PATH_API_V1.auth.feature.refreshAccessToken}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new AuthApi();
