import { DiscountApi } from "@/apis";
import { toast } from "react-hot-toast";
import {
  IDiscountCreateResultApi,
  IDiscountDeleteResultApi,
  IDiscountGetAllResultApi,
  IDiscountGetOneResultApi,
  IDiscountSearchResultApi,
  IDiscountUpdateResultApi,
} from "@/api-types/IDiscountResultApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useQueryString } from "@/hooks";
import { CONSTANT } from "@/utils";

export default class UseDiscountApi {
  static createDiscount(): IDiscountCreateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: DiscountApi.createDiscount,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Create discount successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
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
      createDiscount: mutate,
      isCreatingDiscount: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getOneDiscount(): IDiscountGetOneResultApi {
    const { discountId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["discount"],
      queryFn: () => DiscountApi.getOneDiscount({ _id: discountId }),
    });
    return {
      isGettingDiscount: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllDiscount(): IDiscountGetAllResultApi {
    const queriesString = useQueryString();

    const { isLoading, data } = useQuery({
      queryKey: ["discounts", queriesString],
      queryFn: () =>
        DiscountApi.getAllDiscounts({
          sort: queriesString.sort || "ctime",
          page: Number(queriesString.page) || 1,
          limit: Number(queriesString.limit) || CONSTANT.LIMIT_PAGE,
          status: queriesString.status || "all",
          numericFilters: queriesString?.numericFilters,
        }),
    });

    // Load pre next page

    return {
      isGettingDiscounts: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchDiscount(): IDiscountSearchResultApi {
    const queriesString = useQueryString();
    console.log(queriesString);

    const { isLoading, data } = useQuery({
      queryKey: ["discounts"],
      queryFn: () =>
        DiscountApi.searchDiscounts({
          keySearch: "",
          sort: "ctime",
          page: 1,
          limit: 10,
          numericFilters: "",
        }),
    });

    // Load pre next page

    return {
      isSearchingDiscounts: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateDiscount(): IDiscountUpdateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: DiscountApi.updateDiscount,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Update discount successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
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
      isUpdatingDiscount: isLoading,
      updateDiscount: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteDiscount(): IDiscountDeleteResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: DiscountApi.deleteDiscount,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Delete discount successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["discounts"] });
      },
    });
    return {
      isDeletingDiscount: isLoading,
      deleteDiscount: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
