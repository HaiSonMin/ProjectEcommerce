import { IUser } from "@/interfaces";
import { http, getErrorMessage } from "@/utils";
import { PATH_API_V1 } from "@/constant/path-api";
import { IApi } from "@/helpers";

class UserApi {
  async getUser(arg: Pick<IUser, "_id">): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.user}/getUser/${arg._id}`);
      console.log("response:::", response);
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
