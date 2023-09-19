import { IUser } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { http, getErrorMessage } from "@/utils";
import { IUserCreate } from "@/interfaces/user.interface";
import { PATH_API_V1 } from "@/constant";
import { IApi } from "@/helpers";

class UserApi {
  async checkUser(args: Pick<IUser, "user_email">): Promise<IApi> {
    console.log(args);
    try {
      const response = await http.post(`${PATH_API_V1.user}/checkUser`, args);
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateUser(args: Partial<IUser>): Promise<IApi> {
    try {
      const response = await http.patch(`${PATH_API_V1.user}/update`, args);
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new UserApi();
