import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ITypeProductCategoryResultCreate,
  ITypeProductCategoryResultDelete,
  ITypeProductCategoryResultGetAll,
  ITypeProductCategoryResultUpdate,
} from "../../../apiTypes/IProductCategoryResultApi";
import ProductCategoryApi from "../../../apis/ProductCategory.api";
import { CONSTANT } from "../../../utils";
import { useSearchParams } from "react-router-dom";

export default class UseProductCategoryApi {
  static useCreateCategory(): ITypeProductCategoryResultCreate {
    const queryClient = useQueryClient()
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryApi.createProductCategory,
      onSuccess: () => {
        toast.success("Create product category successfully");
        queryClient.invalidateQueries({queryKey:["productCategories"]})
      },
      onError: () => toast.error("Create product category errors"),
    });
    return {
      createProductCategory: mutate,
      message: data?.message,
      metadata: data?.metadata,
      isCreatingProductCategory: isLoading,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static useGetAllCategory(): ITypeProductCategoryResultGetAll {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const currentPage: number = Number(searchParams.get("page")) || 1;
    const { isLoading, data } = useQuery({
      queryKey: ["productCategories", currentPage],
      queryFn: () =>
        ProductCategoryApi.getAllProductCategory({
          sort: CONSTANT.SORT_DEFAULT,
          page: currentPage,
          limit: CONSTANT.LIMIT_PAGE,
          fields: "productCategory_name,productCategory_image",
        }),
    });

    const numberPage = Math.ceil(
      data?.metadata?.totalProductCategories / CONSTANT.LIMIT_PAGE
    );
    // Get Data next page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", currentPage + 1],
        queryFn: () =>
          ProductCategoryApi.getAllProductCategory({
            sort: CONSTANT.SORT_DEFAULT,
            page: currentPage,
            limit: CONSTANT.LIMIT_PAGE,
            fields: "productCategory_name,productCategory_image",
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["productCategories", currentPage - 1],
        queryFn: () =>
          ProductCategoryApi.getAllProductCategory({
            sort: CONSTANT.SORT_DEFAULT,
            page: currentPage,
            limit: CONSTANT.LIMIT_PAGE,
            fields: "productCategory_name,productCategory_image",
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
  static useUpdateCategory(): ITypeProductCategoryResultUpdate {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryApi.updateProductCategory,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["productCategories"],
        });
      },
      onError: (error: any) => toast.error(error.message),
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
  static useDeleteCategory(): ITypeProductCategoryResultDelete {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductCategoryApi.deleteProductCategory,
      onSuccess: (data) => {
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
