import { getQueriesString, getToastMessageError } from "@/utils";
import { toast } from "react-hot-toast";
import { DemandApi } from "@/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IDemandCreateResultApi,
  IDemandGetByIdResultApi,
  IDemandGetAllResultApi,
  IDemandGetByProductCategoryIdResultApi,
  IDemandUpdateResultApi,
  IDemandDeleteResultApi,
  IDemandsSearchResultApi,
} from "@/api-types/IDemandResultApi";
import { useQueriesString } from "@/hooks";
import { useParams } from "react-router-dom";

export default class UseDemandApi {
  static createDemand(): IDemandCreateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: DemandApi.createDemand,
      onSuccess: () => {
        toast.success("Create demand successfully");
        queryClient.invalidateQueries({ queryKey: ["demands"] });
      },
      onError: (err: any) => {
        toast.error("Create demand error");
      },
    });
    return {
      createDemand: mutate,
      isCreatingDemand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllDemands(): IDemandGetAllResultApi {
    const queryClient = useQueryClient();
    const {
      sort,
      page: currentPage,
      limit,
    } = getQueriesString(useQueriesString());
    const { isLoading, data } = useQuery({
      queryKey: ["demands", sort, currentPage],
      queryFn: () =>
        DemandApi.getAllDemands({
          sort,
          page: currentPage,
          limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalDemands)
      numberPage = Math.ceil(data?.metadata?.totalDemands / limit);
    // Get Data next page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["demands", sort, currentPage + 1],
        queryFn: () =>
          DemandApi.getAllDemands({
            sort,
            page: currentPage + 1,
            limit,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["demands", sort, currentPage - 1],
        queryFn: () =>
          DemandApi.getAllDemands({
            sort,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isGettingDemands: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getDemandById(): IDemandGetByIdResultApi {
    const { demandId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["demands", demandId],
      queryFn: () => DemandApi.getDemandById({ _id: String(demandId) }),
    });

    return {
      isGettingDemand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getDemandByProductCategoryId(): IDemandGetByProductCategoryIdResultApi {
    const { productCategoryId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["demands"],
      queryFn: () =>
        DemandApi.getDemandsByProductCategoryId({
          _id: String(productCategoryId),
        }),
    });

    return {
      isGettingDemands: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchDemands(): IDemandsSearchResultApi {
    const queryClient = useQueryClient();
    const {
      limit,
      keySearch,
      page: currentPage,
    } = getQueriesString(useQueriesString());
    const { data, isLoading } = useQuery({
      queryKey: ["demands", currentPage, keySearch],
      queryFn: () =>
        DemandApi.searchDemands({
          keySearch,
          page: currentPage,
          limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalDemands)
      numberPage = Math.ceil(data?.metadata?.totalDemands / limit);
    // Get Data Next Page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["demands", currentPage + 1, keySearch],
        queryFn: () =>
          DemandApi.searchDemands({
            keySearch,
            page: currentPage + 1,
            limit,
          }),
      });

    // Get Data Next Page
    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["demands", currentPage - 1, keySearch],
        queryFn: () =>
          DemandApi.searchDemands({
            keySearch,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isSearchingDemands: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateDemand(): IDemandUpdateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: DemandApi.updateDemand,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["demands"],
        });
      },
      onError: (error: any) => toast.error(error.message),
    });

    return {
      updateDemand: mutate,
      isUpdatingDemand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
  static deleteDemand(): IDemandDeleteResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: DemandApi.deleteDemand,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["demands"] });
      },
    });
    return {
      deleteDemand: mutate,
      isDeletingDemand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
