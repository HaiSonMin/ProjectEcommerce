import { PATH_API_V1 } from "@/constant";
import { IApi } from "@/helpers";
import { IUser } from "@/interfaces";
import { IUserCreate } from "@/interfaces/user.interface";
import { getErrorMessage, http } from "@/utils";

class AuthApi {
  async login(
    args: Pick<IUser, "user_email" | "user_password">
  ): Promise<IApi> {
    try {
      const response = await http.post(`${PATH_API_V1.auth}/login`, args);
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async logout(): Promise<IApi> {
    try {
      const response = await http.post(`${PATH_API_V1.auth}/logout`);
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async register(args: Partial<IUserCreate>): Promise<IApi> {
    try {
      const response = await http.post(`${PATH_API_V1.auth}/register`, args);
      const result: IApi = response.data;
      return result;
    } catch (error) {
      console.log("error:::", error);
      throw new Error(getErrorMessage(error));
    }
  }

  async refreshAT(): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth}/refreshAccessToken`
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async forgotPassword(args: Pick<IUser, "user_email">): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth}/forgotPassword`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async resetPassword(
    args: Pick<IUserCreate, "user_password" | "reconfirmPassword">
  ): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.auth}/resetPassword`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new AuthApi();
