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
import { useQueriesString } from "@/hooks";
import { getQueriesString } from "@/utils";
import { VALUE_CONSTANT } from "@/constant";

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
    const {
      sort,
      page: currentPage,
      limit,
      status,
      numericFilters,
    } = getQueriesString(useQueriesString());
    const { isLoading, data } = useQuery({
      queryKey: ["discounts", sort, currentPage, status, limit, numericFilters],
      queryFn: () =>
        DiscountApi.getAllDiscounts({
          sort: sort || "ctime",
          page: Number(currentPage) || 1,
          limit: Number(limit) || VALUE_CONSTANT.LIMIT_PAGE,
          status: status || "all",
          numericFilters,
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
    const queriesString = useQueriesString();
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
