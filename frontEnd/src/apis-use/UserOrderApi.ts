import { OrderApi } from "@/apis";
import { toast } from "react-hot-toast";
import {
  IOrderCreateResultApi,
  IOrderDeleteResultApi,
  IOrderGetAllResultApi,
  IOrderGetOneResultApi,
  IOrderSearchResultApi,
  IOrderUpdateResultApi,
} from "@/interfaces/result-apis/IOrderResultApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useQueriesString } from "@/hooks";
import CONSTANT from "@/constant/value-constant";

export default class UseOrderApi {
  static createOrder(): IOrderCreateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: OrderApi.createOrder,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Create Order successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
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
      createOrder: mutate,
      isCreatingOrder: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getOneOrder(): IOrderGetOneResultApi {
    const { orderId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["order"],
      queryFn: () => OrderApi.getOneOrder({ _id: orderId }),
    });
    return {
      isGettingOrder: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllOrder(): IOrderGetAllResultApi {
    const queriesString = useQueriesString();

    const { isLoading, data } = useQuery({
      queryKey: ["orders", queriesString],
      queryFn: () =>
        OrderApi.getAllOrders({
          sort: queriesString.sort || "ctime",
          page: Number(queriesString.page) || 1,
          limit: Number(queriesString.limit) || CONSTANT.LIMIT_PAGE,
          status: queriesString.status || "all",
          numericFilters: queriesString?.numericFilters,
        }),
    });

    // Load pre next page

    return {
      isGettingOrders: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchOrder(): IOrderSearchResultApi {
    const queriesString = useQueriesString();
    console.log(queriesString);

    const { isLoading, data } = useQuery({
      queryKey: ["orders"],
      queryFn: () =>
        OrderApi.searchOrders({
          keySearch: "",
          sort: "ctime",
          page: 1,
          limit: 10,
          numericFilters: "",
        }),
    });

    // Load pre next page

    return {
      isSearchingOrders: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateOrder(): IOrderUpdateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: OrderApi.updateOrder,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Update order successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
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
      isUpdatingOrder: isLoading,
      updateOrder: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteOrder(): IOrderDeleteResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: OrderApi.deleteOrder,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Delete order successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
    });
    return {
      isDeletingOrder: isLoading,
      deleteOrder: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
