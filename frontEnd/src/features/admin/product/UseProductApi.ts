import { ProductApi } from "@/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IProductCreateResultApi,
  IProductGetOneResultApi,
  IProductGetAllResultApi,
  IProductDeleteResultApi,
  IProductSearchResultApi,
  IProductUpdateResultApi,
} from "@/api-types/IProductResultApi";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getQueriesString } from "@/utils";
import { useQueriesString } from "@/hooks";

export default class UseProductApi {
  static createProduct(): IProductCreateResultApi {
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

  static getAllProducts(): IProductGetAllResultApi {
    const queryClient = useQueryClient();

    const {
      sort,
      page: currentPage,
      limit,
      numericFilters,
    } = getQueriesString(useQueriesString());

    const { isLoading, data } = useQuery({
      queryKey: ["products", sort, currentPage, limit, numericFilters],
      queryFn: () =>
        ProductApi.getAllProducts({
          sort,
          page: currentPage,
          limit,
          numericFilters,
        }),
    });

    let numberPage: number = 1;
    if (data?.metadata?.totalProducts)
      numberPage = Math.ceil(data?.metadata?.totalProducts / limit);

    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["products", sort, currentPage + 1, limit, numericFilters],
        queryFn: () =>
          ProductApi.getAllProducts({
            sort,
            page: currentPage + 1,
            limit,
            numericFilters,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["products", sort, currentPage - 1, limit, numericFilters],
        queryFn: () =>
          ProductApi.getAllProducts({
            sort,
            page: currentPage - 1,
            limit,
            numericFilters,
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

  static getProductById(): IProductGetOneResultApi {
    const { productId } = useParams();

    const { isLoading, data } = useQuery({
      queryKey: ["product", productId],
      queryFn: () =>
        ProductApi.getProductById({
          _id: productId || "",
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

  static searchProducts(): IProductSearchResultApi {
    const queryClient = useQueryClient();
    const {
      sort,
      page: currentPage,
      limit,
      keySearch,
      numericFilters,
    } = getQueriesString(useQueriesString());
    const { isLoading, data } = useQuery({
      queryKey: [
        "products",
        sort,
        currentPage,
        limit,
        numericFilters,
        keySearch,
      ],
      queryFn: () =>
        ProductApi.searchProducts({
          sort,
          page: currentPage,
          limit,
          keySearch,
          numericFilters,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.totalProducts)
      numberPage = Math.ceil(data?.metadata?.totalProducts / limit);

    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: [
          "products",
          sort,
          currentPage + 1,
          limit,
          numericFilters,
          keySearch,
        ],
        queryFn: () =>
          ProductApi.searchProducts({
            sort,
            page: currentPage + 1,
            limit,
            keySearch,
            numericFilters,
          }),
      });

    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: [
          "products",
          sort,
          currentPage - 1,
          limit,
          numericFilters,
          keySearch,
        ],
        queryFn: () =>
          ProductApi.searchProducts({
            sort,
            page: currentPage - 1,
            limit,
            keySearch,
            numericFilters,
          }),
      });
    return {
      isSearchingProducts: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateProduct(): IProductUpdateResultApi {
    const queryClient = useQueryClient();
    const { isLoading, data, mutate } = useMutation({
      mutationFn: ProductApi.updateProduct,
      onSuccess: (dataUpdated) => {
        console.log(dataUpdated);
        toast.success("Update product success");
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        queryClient.removeQueries({
          queryKey: ["product"],
        });
      },
      onError: () => toast.error("Delete Error"),
    });

    return {
      isUpdatingProduct: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
      updateProduct: mutate,
    };
  }

  static deleteProduct(): IProductDeleteResultApi {
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
}
