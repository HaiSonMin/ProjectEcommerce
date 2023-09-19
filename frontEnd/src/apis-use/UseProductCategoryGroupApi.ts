import { toast } from "react-hot-toast";
import { getQueriesString } from "@/utils";
import { useQueriesString } from "@/hooks";
import { useParams } from "react-router-dom";
import { ProductCategoryGroupApi } from "@/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IProductCategoryGroupCreateResultApi,
  IProductCategoryGroupDeleteResultApi,
  IProductCategoryGroupGetAllResultApi,
  IProductCategoryGroupUpdateResultApi,
  IProductCategoryGroupGetByIdResultApi,
} from "@/apis-results/IProductCategoryGroupResultApi";

export default class UseProductCategoryGroupApi {
  static createCategoryGroup(): IProductCategoryGroupCreateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryGroupApi.createProductCategoryGroup,
      onSuccess: () => {
        toast.success("Create product category successfully");
        queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      },
      onError: () => toast.error("Create product category errors"),
    });
    return {
      createProductCategoryGroup: mutate,
      isCreatingProductCategoryGroup: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllCategoriesGroup(
    limitCustom?: number
  ): IProductCategoryGroupGetAllResultApi {
    const queryClient = useQueryClient();
    const {
      sort,
      page: currentPage,
      limit,
    } = getQueriesString(useQueriesString());
    const { isLoading, data } = useQuery({
      queryKey: ["productCategories", sort, currentPage, limit],
      queryFn: () =>
        ProductCategoryGroupApi.getAllProductCategoriesGroup({
          sort,
          page: currentPage,
          limit: limitCustom ?? limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalProductCategoriesGroup)
      numberPage = Math.ceil(
        data?.metadata?.totalProductCategoriesGroup / limit
      );
    // Get Data next page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", sort, currentPage + 1],
        queryFn: () =>
          ProductCategoryGroupApi.getAllProductCategoriesGroup({
            sort,
            page: currentPage + 1,
            limit,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", sort, currentPage - 1],
        queryFn: () =>
          ProductCategoryGroupApi.getAllProductCategoriesGroup({
            sort,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isGettingProductCategoriesGroup: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getCategoryGroupById(): IProductCategoryGroupGetByIdResultApi {
    const { productCategoryGroupId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["productCategory", productCategoryGroupId],
      queryFn: () =>
        ProductCategoryGroupApi.getProductCategoryGroupById({
          _id: String(productCategoryGroupId),
        }),
    });

    return {
      isGettingProductCategoryGroup: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateCategoryGroup(): IProductCategoryGroupUpdateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryGroupApi.updateProductCategoryGroup,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["productCategories"],
        });
      },
      onError: (error: any) => toast.error(error.message),
    });

    return {
      updateProductCategoryGroup: mutate,
      isUpdatingProductCategoryGroup: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
  static deleteCategoryGroup(): IProductCategoryGroupDeleteResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryGroupApi.deleteProductCategoryGroup,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      },
    });
    return {
      deleteProductCategoryGroup: mutate,
      isDeletingProductCategoryGroup: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
