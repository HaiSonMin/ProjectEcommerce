import ICoupon from "@/interfaces/models/coupon.interface";
import { IApi } from "@/interfaces/shared";
import { UseMutateFunction } from "@tanstack/react-query";

export interface ICouponCreateResultApi extends IApi {
  isCreatingCoupon: boolean;
  metadata: ICoupon | undefined;
  createCoupon: UseMutateFunction<IApi, any, Partial<ICoupon>>;
}

export interface ICouponGetAllResultApi extends IApi {
  isGettingCoupons: boolean;
  metadata:
    | {
        totalCoupons: number;
        couponsPerPage: number;
        coupons: Array<ICoupon>;
      }
    | undefined;
}

export interface ICouponGetOneResultApi extends IApi {
  isGettingCoupon: boolean;
  metadata: ICoupon | undefined;
}

export interface ICouponSearchResultApi
  extends Omit<ICouponGetAllResultApi, "isGettingCoupons"> {
  isSearchingCoupons: boolean;
}

export interface ICouponUpdateResultApi extends IApi {
  isUpdatingCoupon: boolean;
  metadata: ICoupon | undefined;
  updateCoupon: UseMutateFunction<any, unknown, Partial<ICoupon>>;
}

export interface ICouponDeleteResultApi extends IApi {
  isDeletingCoupon: boolean;
  metadata: ICoupon | undefined;
  deleteCoupon: UseMutateFunction<any, unknown, Pick<ICoupon, "_id">>;
}
