import { AdminApi, UserApi } from "@/apis";
import { toast } from "react-hot-toast";
import { useQueriesString } from "@/hooks";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IAdminGetOneUserResultApi,
  IUserUpdateResultApi,
} from "@/apis-results/IUserResultApi";

export default class UseUserApi {
  static getUser(): IAdminGetOneUserResultApi {
    const { userId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["user"],
      queryFn: () => UserApi.getUser({ _id: userId || "" }),
    });
    return {
      isGettingUser: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static update(): IUserUpdateResultApi {
    const { isLoading, mutate, data } = useMutation({
      mutationFn: UserApi.updateUser,
      onSuccess: (data) => {
        console.log(data.metadata);
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
    return {
      updateUser: mutate,
      isUpdating: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
