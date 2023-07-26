import { CouponApi } from "@/apis";
import { toast } from "react-hot-toast";
import {
  ICouponCreateResultApi,
  ICouponDeleteResultApi,
  ICouponGetAllResultApi,
  ICouponGetOneResultApi,
  ICouponSearchResultApi,
  ICouponUpdateResultApi,
} from "@/api-types/ICouponApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useQueryString } from "@/hooks";
import { CONSTANT, getToastMessageError } from "@/utils";

export default class UseCouponApi {
  static createCoupon(): ICouponCreateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: CouponApi.createCoupon,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Create coupon successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
      },
      onError: (error: any) => {
        toast.error(getToastMessageError(error.message));
      },
    });
    return {
      createCoupon: mutate,
      isCreatingCoupon: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getOneCoupon(): ICouponGetOneResultApi {
    const { couponId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["coupon"],
      queryFn: () => CouponApi.getOneCoupon({ _id: couponId }),
    });
    return {
      isGettingCoupon: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllCoupons(): ICouponGetAllResultApi {
    const queriesString = useQueryString();

    const { isLoading, data } = useQuery({
      queryKey: ["coupons", queriesString],
      queryFn: () =>
        CouponApi.getAllCoupons({
          sort: queriesString.sort || "ctime",
          page: Number(queriesString.page) || 1,
          limit: Number(queriesString.limit) || CONSTANT.LIMIT_PAGE,
          status: queriesString.status || "all",
          numericFilters: queriesString?.numericFilters,
        }),
    });

    // Load pre next page

    return {
      isGettingCoupons: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchCoupons(): ICouponSearchResultApi {
    const queriesString = useQueryString();

    const { isLoading, data } = useQuery({
      queryKey: ["coupons", queriesString],
      queryFn: () =>
        CouponApi.searchCoupons({
          keySearch: queriesString.keySearch,
          sort: "ctime",
          page: queriesString.page || 1,
          limit: queriesString.limit || CONSTANT.LIMIT_PAGE,
        }),
    });

    // Load pre next page

    return {
      isSearchingCoupons: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateCoupon(): ICouponUpdateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: CouponApi.updateCoupon,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Update Coupon successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
      },
      onError: (error: any) => {
        toast.error(getToastMessageError(error.message));
      },
    });
    return {
      isUpdatingCoupon: isLoading,
      updateCoupon: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteCoupon(): ICouponDeleteResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: CouponApi.deleteCoupon,
      onSuccess: (data) => {
        const messageSuccess = data?.message || "Delete Coupon successfully";
        toast.success(messageSuccess);
        queryClient.invalidateQueries({ queryKey: ["coupons"] });
      },
    });
    return {
      isDeletingCoupon: isLoading,
      deleteCoupon: mutate,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
