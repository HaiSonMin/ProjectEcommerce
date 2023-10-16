import {
  ICityGetAllCities,
  ICityGetAllDistrictInCity,
  ICityGetAllWardsInDistrict,
} from "@/apis-results/ICityResultApi";
import { CityApi } from "@/apis";
import { useQuery } from "@tanstack/react-query";

class UseCityApi {
  static getAllCities(): ICityGetAllCities {
    const { data, isLoading } = useQuery({
      queryKey: ["cities"],
      queryFn: () => CityApi.getAllCities(),
    });

    return {
      isGettingCities: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
  static getAllDistricts(cityCode: number): ICityGetAllDistrictInCity {
    const { data, isLoading } = useQuery({
      queryKey: ["districts", cityCode],
      queryFn: () => CityApi.getAllDistricts(cityCode),
    });

    return {
      isGettingDistricts: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
  static getAllWards(districtCode: number): ICityGetAllWardsInDistrict {
    const { data, isLoading } = useQuery({
      queryKey: ["wards", districtCode],
      queryFn: () => CityApi.getAllWards(districtCode),
    });

    return {
      isGettingWards: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}

export default UseCityApi;
