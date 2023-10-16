import { IApi } from "@/helpers";
import { ICity, IDistrict, IWard } from "@/interfaces";

export interface ICityGetAllCities extends IApi {
  isGettingCities: boolean;
  metadata: Array<ICity>;
}

export interface ICityGetAllDistrictInCity extends IApi {
  isGettingDistricts: boolean;
  metadata: IDistrict;
}

export interface ICityGetAllWardsInDistrict extends IApi {
  isGettingWards: boolean;
  metadata: IWard;
}
