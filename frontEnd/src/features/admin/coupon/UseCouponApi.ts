import { CouponApi } from "@/apis";
import { toast } from "react-hot-toast";
import {
  ICouponCreateResultApi,
  ICouponDeleteResultApi,
  ICouponGetAllResultApi,
  ICouponGetOneResultApi,
  ICouponSearchResultApi,
  ICouponUpdateResultApi,
} from "@/api-types/ICouponResultApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useQueriesString } from "@/hooks";
import {  getQueriesString, getToastMessageError } from "@/utils";
import { VALUE_CONSTANT } from "@/constant";

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
    const queryClient = useQueryClient();
    const {
      sort,
      page: currentPage,
      limit,
      status,
      numericFilters,
    } = getQueriesString(useQueriesString());

    const { isLoading, data } = useQuery({
      queryKey: ["coupons", sort, currentPage, limit, status, numericFilters],
      queryFn: () =>
        CouponApi.getAllCoupons({
          sort,
          page: currentPage,
          limit,
          status,
          numericFilters,
        }),
    });

    let numberPage: number = 1;
    if (data?.metadata?.totalCoupons)
      numberPage = Math.ceil(data?.metadata?.totalCoupons / limit);

    // Load pre next page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: [
          "coupons",
          sort,
          currentPage + 1,
          limit,
          status,
          numericFilters,
        ],
        queryFn: () => {
          CouponApi.getAllCoupons({
            sort,
            page: currentPage + 1,
            limit,
            status,
            numericFilters,
          });
        },
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: [
          "coupons",
          sort,
          currentPage - 1,
          limit,
          status,
          numericFilters,
        ],
        queryFn: () => {
          CouponApi.getAllCoupons({
            sort,
            page: currentPage - 1,
            limit,
            status,
            numericFilters,
          });
        },
      });

    return {
      isGettingCoupons: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchCoupons(): ICouponSearchResultApi {
    const queriesString = useQueriesString();

    const { isLoading, data } = useQuery({
      queryKey: ["coupons", queriesString],
      queryFn: () =>
        CouponApi.searchCoupons({
          keySearch: queriesString.keySearch,
          sort: "ctime",
          page: queriesString.page || 1,
          limit: queriesString.limit || VALUE_CONSTANT.LIMIT_PAGE,
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
