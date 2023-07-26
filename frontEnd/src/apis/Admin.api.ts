import { CONSTANT, http, getErrorMessage, resultAppendFormData } from "@/utils";
import IArgsQuery from "@/helpers/IArgsQuery";
import { IUser } from "@/interfaces";
import {
  IUserCreateResultApi,
  IUserDeleteResultApi,
  IUserGetAllResultApi,
  IUserGetOneResultApi,
  IUserSearchResultApi,
  IUserUpdateResultApi,
} from "@/api-types/IUserResultApi";
import { IUserCreate } from "@/interfaces/user.interface";

class AdminApi {
  async createUser(args: Omit<IUserCreate, "_id" | "user_isBlocking">) {
    console.log(args);
    try {
      const response = await http.post(
        `${CONSTANT.PATH_V1_API.admin}/createEmployees`,
        args
      );
      const result: Omit<
        IUserCreateResultApi,
        "isCreatingUser" | "createUser"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllUsers(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.admin}/getAllUsers`,
        {
          params: {
            sort: fieldsQuery.sort,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
            fields: fieldsQuery.fields,
            status: fieldsQuery.status,
            keySearch: fieldsQuery.keySearch,
          },
        }
      );
      const result: Omit<IUserGetAllResultApi, "isGettingUsers"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getOneUser(arg: Pick<IUser, "_id">) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.admin}/getOneUser/${arg._id}`
      );
      const result: Omit<IUserGetOneResultApi, "isGettingUser"> = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchUsers(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.admin}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: Omit<IUserSearchResultApi, "isSearchingUsers"> =
        response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateUser(args: Partial<IUser>) {
    const response = await http.patch(
      `${CONSTANT.PATH_V1_API.admin}/update/${args._id}`,
      args
    );
    const result: Omit<IUserUpdateResultApi, "isUpdatingUser" | "updateUser"> =
      response.data;
    return result;
  }

  async deleteUser(arg: Pick<IUser, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.admin}/delete/${arg._id}`
      );
      const result: Omit<
        IUserDeleteResultApi,
        "isDeletingUser" | "deleteUser"
      > = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new AdminApi();
