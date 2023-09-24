import { IUser } from "@/interfaces";
import IArgsQuery from "@/helpers/IArgsQuery";
import { http, getErrorMessage } from "@/utils";
import { PATH_API_V1 } from "@/constant";
import { IApi } from "@/helpers";
import { IAuthRegister } from "@/interfaces/auth.interface";

class AdminApi {
  async createUser(args: IAuthRegister): Promise<IApi> {
    console.log(args);
    try {
      const response = await http.post(
        `${PATH_API_V1.admin}/createEmployees`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllUsers(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.admin}/getAllUsers`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          fields: fieldsQuery.fields,
          status: fieldsQuery.status,
          keySearch: fieldsQuery.keySearch,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getOneUser(arg: Pick<IUser, "_id">): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.admin}/getOneUser/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchUsers(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.admin}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateUser(args: Partial<IUser>): Promise<IApi> {
    const response = await http.patch(
      `${PATH_API_V1.admin}/update/${args._id}`,
      args
    );
    const result: IApi = response.data;
    return result;
  }

  async deleteUser(arg: Pick<IUser, "_id">): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.admin}/delete/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new AdminApi();
