import { IApi } from "@/interfaces/shared";
import { getErrorMessage, http } from "@/utils";
import { PATH_API_V1 } from "@/constant/path-api";

class CityApi {
  async getAllCities(): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.city.mainPath}${PATH_API_V1.city.feature.getAllCities}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllDistricts(cityCode: number): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.city.mainPath}${PATH_API_V1.city.feature.getAllDistricts}/${cityCode}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllWards(districtCode: number): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.city.mainPath}${PATH_API_V1.city.feature.getAllWards}/${districtCode}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new CityApi();
