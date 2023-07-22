import { ProductApi } from "../../../apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ITypeProductCreateResult,
  ITypeProductGetAllResult,
  ITypeProductGetOneResult,
  ITypeProductDeleteResult,
  ITypeProductUpdateBasicResult,
  ITypeProductMainInfoUpdateResult,
  ITypeProductProvideMainInfoResult,
  ITypeProductMainInfoDeleteResult,
  ITypeProductMainInfoGetOneResult,
} from "apiTypes/IProductResultApi";
import { toast } from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { CONSTANT } from "../../../utils";

export default class UseProductApi {
  static createProduct(): ITypeProductCreateResult {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductApi.createProduct,
      onSuccess: () => {
        toast.success("Create product successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: () => toast.error("Create product errors"),
    });
    return {
      createProduct: mutate,
      isCreatingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static provideProductMainInfo(): ITypeProductProvideMainInfoResult {
    const queryClient = useQueryClient();
    const { isLoading, mutate, data } = useMutation({
      mutationFn: ProductApi.provideProductMainInfo,
      onSuccess: () => {
        toast.success("Provide product successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => toast.error("Create product errors"),
    });
    return {
      provideProductMainInfo: mutate,
      isAddingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllProducts(): ITypeProductGetAllResult {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const currentPage: number = Number(searchParams.get("page")) || 1;
    const currentSort: string =
      searchParams.get("sort") || CONSTANT.SORT_DEFAULT;
    const currentLimit: string | number =
      searchParams.get("limit") || CONSTANT.LIMIT_PAGE;
    const currentFilter: string = searchParams.get("numericFilters");

    const { isLoading, data } = useQuery({
      queryKey: ["products", currentPage, currentSort, currentFilter],
      queryFn: () =>
        ProductApi.getAllProduct({
          sort: currentSort,
          page: currentPage,
          limit: currentLimit,
          numericFilters: currentFilter,
        }),
    });

    const numberPage = Math.ceil(
      data?.metadata?.totalProducts / CONSTANT.LIMIT_PAGE
    );

    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["products", currentPage + 1, currentSort, currentFilter],
        queryFn: () =>
          ProductApi.getAllProduct({
            sort: CONSTANT.SORT_DEFAULT,
            page: currentPage,
            limit: CONSTANT.LIMIT_PAGE,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["products", currentPage - 1, currentSort, currentFilter],
        queryFn: () =>
          ProductApi.getAllProduct({
            sort: CONSTANT.SORT_DEFAULT,
            page: currentPage,
            limit: CONSTANT.LIMIT_PAGE,
          }),
      });
    return {
      isGettingProducts: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getProductById(): ITypeProductGetOneResult {
    const { productId } = useParams();

    const { isLoading, data } = useQuery({
      queryKey: ["product", productId],
      queryFn: () =>
        ProductApi.getProductById({
          _id: productId,
        }),
    });
    return {
      isGettingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getProductMainInfoById(): ITypeProductMainInfoGetOneResult {
    const [searchParams] = useSearchParams();

    const productMainInfoId = searchParams.get("mainInfoId");

    const { isLoading, data } = useQuery({
      queryKey: ["product", productMainInfoId],
      queryFn: () =>
        ProductApi.getProductMainInfoById({
          _id: productMainInfoId,
        }),
    });
    return {
      isGettingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateProductBasic(): ITypeProductUpdateBasicResult {
    const queryClient = useQueryClient();
    const { productId } = useParams();
    const { isLoading, data, mutate } = useMutation({
      mutationFn: ProductApi.updateProductBasic,
      onSuccess: () => {
        toast.success("Update Images Product Successfully");
        queryClient.invalidateQueries({ queryKey: ["product", productId] });
      },
      onError: () => toast.error("Update Error"),
    });

    return {
      isUpdatingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
      updateProductBasic: mutate,
    };
  }

  static updateProductMainInfo(): ITypeProductMainInfoUpdateResult {
    const queryClient = useQueryClient();
    const { isLoading, data, mutate } = useMutation({
      mutationFn: ProductApi.updateProductMainInfo,
      onSuccess: () => {
        toast.success("Update Product Successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: () => toast.error("Update Error"),
    });

    return {
      isUpdatingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
      updateProductMainInfo: mutate,
    };
  }

  static deleteProduct(): ITypeProductDeleteResult {
    const queryClient = useQueryClient();
    const { isLoading, data, mutate } = useMutation({
      mutationFn: ProductApi.deleteProduct,
      onSuccess: () => {
        toast.success("Delete Product Successfully");
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: () => toast.error("Delete Error"),
    });

    return {
      isDeletingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
      deleteProduct: mutate,
    };
  }

  static deleteProductMainInfo(): ITypeProductMainInfoDeleteResult {
    const queryClient = useQueryClient();
    const { isLoading, data, mutate } = useMutation({
      mutationFn: ProductApi.deleteProductMainInfo,
      onSuccess: () => {
        toast.success("Delete Product MainInfo Successfully");
        queryClient.invalidateQueries({ queryKey: ["product"] });
      },
      onError: () => toast.error("Delete Error"),
    });

    return {
      isDeletingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
      deleteProductMainInfo: mutate,
    };
  }
}
