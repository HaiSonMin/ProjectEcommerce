import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BrandApi } from "../../../apis";
import {
  ITypeBrandResultCreate,
  ITypeBrandResultUpdate,
  ITypeBrandResultDelete,
  ITypeBrandResultGetOne,
  ITypeBrandResultGetAll,
} from "../../../apiTypes/IBrandResultApi";
import { toast } from "react-hot-toast";
import { CONSTANT } from "../../../utils";
import { useSearchParams } from "react-router-dom";
``;

class UseBrand {
  static useCreateBrand(): ITypeBrandResultCreate {
    const queryClient = useQueryClient();
    const { data, mutate, isLoading } = useMutation({
      mutationFn: BrandApi.createBrand,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      createBrand: mutate,
      isCreatingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static useGetAllBrand(): ITypeBrandResultGetAll {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const { data, isLoading } = useQuery({
      queryKey: ["brands", currentPage],
      queryFn: () =>
        BrandApi.getAllBrands({
          sort: CONSTANT.SORT_DEFAULT,
          page: currentPage,
          limit: CONSTANT.LIMIT_PAGE,
          fields: "brand_name,brand_origin,brand_image",
        }),
    });
    const numberPage = Math.ceil(
      data?.metadata?.totalBrands / CONSTANT.LIMIT_PAGE
    );

    // Get Data Next Page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ["brands", currentPage + 1],
        queryFn: () =>
          BrandApi.getAllBrands({
            sort: CONSTANT.SORT_DEFAULT,
            page: currentPage + 1,
            limit: CONSTANT.LIMIT_PAGE,
            fields: "brand_name,brand_origin,brand_image",
          }),
      });

    // Get Data Next Page
    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ["brands", currentPage - 1],
        queryFn: () =>
          BrandApi.getAllBrands({
            sort: CONSTANT.SORT_DEFAULT,
            page: currentPage - 1,
            limit: CONSTANT.LIMIT_PAGE,
            fields: "brand_name,brand_origin,brand_image",
          }),
      });

    return {
      isGettingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
  static useGetBrand(): ITypeBrandResultGetOne {
    // const { brandId } = useParams();
    const brandId = "64ad0152705b05f63cdc9bfa";

    const { data, isLoading } = useQuery({
      queryKey: ["brand"],
      queryFn: () => BrandApi.getBrand({ _id: brandId }),
    });

    return {
      isGettingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static useUpdateBrand(): ITypeBrandResultUpdate {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation({
      mutationFn: BrandApi.updateBrand,
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
    });

    return {
      updateBrand: mutate,
      isUpdatingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static useDeleteBrand(): ITypeBrandResultDelete {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation({
      mutationFn: BrandApi.deleteBrand,
      onSuccess: () => {
        toast.success("Delete Brand Successfully");
        queryClient.invalidateQueries({
          queryKey: ["brands"],
        });
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      deleteBrand: mutate,
      isDeletingBrand: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}

export default UseBrand;
