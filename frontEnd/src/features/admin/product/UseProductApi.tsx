import { ProductApi } from "@/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IProductCreateResultApi,
  IProductGetOneResultApi,
  IProductGetAllResultApi,
  IProductDeleteResultApi,
  IProductUpdateBasicResultApi,
  IProductMainInfoDeleteResultApi,
  IProductMainInfoGetOneResultApi,
  IProductMainInfoUpdateResultApi,
  IProductProvideMainInfoResultApi,
  IProductSearchResultApi,
} from "@/api-types/IProductResultApi";
import { toast } from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";
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

  static provideProductMainInfo(): IProductProvideMainInfoResultApi {
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

  static getProductMainInfoById(): IProductMainInfoGetOneResultApi {
    const [searchParams] = useSearchParams();

    const productMainInfoId = searchParams.get("mainInfoId") || "";

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

  static updateProductBasic(): IProductUpdateBasicResultApi {
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

  static updateProductMainInfo(): IProductMainInfoUpdateResultApi {
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

  static deleteProductMainInfo(): IProductMainInfoDeleteResultApi {
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
