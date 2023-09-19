import { AdminApi } from "@/apis";
import { toast } from "react-hot-toast";
import { useQueriesString } from "@/hooks";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IAdminCreateUserResultApi,
  IAdminDeleteUserResultApi,
  IAdminGetAllUserResultApi,
  IAdminGetOneUserResultApi,
  IAdminSearchUserResultApi,
  IAdminUpdateUserResultApi,
} from "@/apis-results/IAdminResultApi";
import { VALUE_CONSTANT } from "@/constant";

export default class UseAdminApi {
  static createUser(): IAdminCreateUserResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: AdminApi.createUser,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Create User successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error: any) => {
        if (error.message.includes("duplicate")) {
          const i1 = error.message.indexOf("{ ");
          const i2 = error.message.indexOf("}");
          const tempStr = error.message.slice(i1 + 1, i2);
          const messageError = `Duplicate${tempStr}`;
          toast.error(messageError);
        }
      },
    });
    return {
      createUser: mutate,
      isCreatingUser: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getOneUser(): IAdminGetOneUserResultApi {
    const { userId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["user"],
      queryFn: () => AdminApi.getOneUser({ _id: userId || "" }),
    });
    return {
      isGettingUser: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllUser(): IAdminGetAllUserResultApi {
    const queriesString = useQueriesString();

    const { isLoading, data } = useQuery({
      queryKey: ["users", queriesString],
      queryFn: () =>
        AdminApi.getAllUsers({
          sort: queriesString.sort || "ctime",
          page: Number(queriesString.page) || 1,
          limit: Number(queriesString.limit) || VALUE_CONSTANT.LIMIT_PAGE,
          status: queriesString.status || "all",
          keySearch: queriesString.keySearch,
          numericFilters: queriesString?.numericFilters,
        }),
    });

    // Load pre next page

    return {
      isGettingUsers: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchUsers(): IAdminSearchUserResultApi {
    const queriesString = useQueriesString();
    console.log(queriesString);

    const { isLoading, data } = useQuery({
      queryKey: ["users", queriesString],
      queryFn: () =>
        AdminApi.searchUsers({
          keySearch: queriesString.keySearch,
          sort: "ctime",
          page: queriesString.page || 1,
          limit: queriesString.limit || VALUE_CONSTANT.LIMIT_PAGE,
        }),
    });

    return {
      isSearchingUsers: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateUser(): IAdminUpdateUserResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: AdminApi.updateUser,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Update User successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error: any) => {
        if (error.message.includes("duplicate")) {
          const i1 = error.message.indexOf("{ ");
          const i2 = error.message.indexOf("}");
          const tempStr = error.message.slice(i1 + 1, i2);
          const messageError = `Duplicate${tempStr}`;
          toast.error(messageError);
        }
      },
    });
    return {
      isUpdatingUser: isLoading,
      updateUser: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteUser(): IAdminDeleteUserResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: AdminApi.deleteUser,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Delete User successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
    return {
      isDeletingUser: isLoading,
      deleteUser: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
