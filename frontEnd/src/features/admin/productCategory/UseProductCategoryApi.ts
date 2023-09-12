import { getQueriesString } from "@/utils";
import { toast } from "react-hot-toast";
import { ProductCategoryApi } from "@/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IProductCategoriesGetMulti,
  IProductCategoryCreateResultApi,
  IProductCategoryDeleteResultApi,
  IProductCategoryGetAllResultApi,
  IProductCategoryUpdateResultApi,
  IProductCategoryGetByIdResultApi,
  IProductCategorySearchResultApi,
} from "@/api-types/IProductCategoryResultApi";
import { useQueriesString } from "@/hooks";
import { useParams } from "react-router-dom";
import { IApi } from "@/helpers";

export default class UseProductCategoryApi {
  static createCategory(): IProductCategoryCreateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryApi.createProductCategory,
      onSuccess: () => {
        toast.success("Create product category successfully");
        queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      },
      onError: (error: any) => toast.error(error.message),
    });
    return {
      createProductCategory: mutate,
      isCreatingProductCategory: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllCategories(
    limitCustom?: number
  ): IProductCategoryGetAllResultApi {
    const queryClient = useQueryClient();
    const {
      sort,
      page: currentPage,
      limit,
    } = getQueriesString(useQueriesString());
    const { isLoading, data } = useQuery({
      queryKey: ["productCategories", sort, currentPage, limit],
      queryFn: () =>
        ProductCategoryApi.getAllProductCategories({
          sort,
          page: currentPage,
          limit: limitCustom ?? limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalProductCategories)
      numberPage = Math.ceil(data?.metadata?.totalProductCategories / limit);
    // Get Data next page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", sort, currentPage + 1, limit],
        queryFn: () =>
          ProductCategoryApi.getAllProductCategories({
            sort,
            page: currentPage + 1,
            limit,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", sort, currentPage - 1, limit],
        queryFn: () =>
          ProductCategoryApi.getAllProductCategories({
            sort,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isGettingProductCategories: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static searchCategories(
    limitCustom?: number
  ): IProductCategorySearchResultApi {
    const queryClient = useQueryClient();
    const {
      keySearch,
      page: currentPage,
      limit,
    } = getQueriesString(useQueriesString());
    const { isLoading, data } = useQuery({
      queryKey: ["productCategories", keySearch, currentPage, limit],
      queryFn: () =>
        ProductCategoryApi.searchCategories({
          keySearch,
          page: currentPage,
          limit: limitCustom ?? limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalProductCategories)
      numberPage = Math.ceil(data?.metadata?.totalProductCategories / limit);
    // Get Data next page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", keySearch, currentPage + 1, limit],
        queryFn: () =>
          ProductCategoryApi.searchCategories({
            keySearch,
            page: currentPage + 1,
            limit,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", keySearch, currentPage - 1, limit],
        queryFn: () =>
          ProductCategoryApi.searchCategories({
            keySearch,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isSearchingProductCategories: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getCategoryById(
    categoryId?: string
  ): IProductCategoryGetByIdResultApi {
    const { productCategoryId } = useParams();
    const { isLoading, data } = useQuery({
      queryKey: ["productCategory", productCategoryId, categoryId],
      queryFn: () =>
        ProductCategoryApi.getProductCategoryById({
          _id: String(productCategoryId || categoryId),
        }),
    });

    return {
      isGettingProductCategory: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getCategoriesByGroupId(groupId: string): IProductCategoriesGetMulti {
    const { isLoading, data } = useQuery({
      queryKey: ["productCategoriesByGroup", groupId],
      queryFn: () =>
        ProductCategoryApi.getProductCategoryByGroupId({
          productCategory_group: groupId,
        }),
    });

    return {
      isGettingProductCategories: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getCategoriesByIds(
    categoriesIds: Array<string> | undefined
  ): IProductCategoriesGetMulti {
    const { isLoading, data } = useQuery({
      queryKey: ["productCategories"],
      queryFn: () =>
        ProductCategoryApi.getProductCategoriesByIds(categoriesIds),
    });

    return {
      isGettingProductCategories: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateCategory(): IProductCategoryUpdateResultApi {
    const { productCategoryId } = useParams();
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryApi.updateProductCategory,
      onSuccess: (data: IApi) => {
        toast.success(
          `Update category ${data.metadata?.productCategory_name} successfully`
        );
        queryClient.invalidateQueries({
          queryKey: ["productCategories"],
        });
        queryClient.removeQueries({
          queryKey: ["productCategory", productCategoryId],
        });
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.message);
      },
    });

    return {
      updateProductCategory: mutate,
      isUpdatingProductCategory: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteCategory(): IProductCategoryDeleteResultApi {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryApi.deleteProductCategory,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      },
    });
    return {
      deleteProductCategory: mutate,
      isDeletingProductCategory: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
