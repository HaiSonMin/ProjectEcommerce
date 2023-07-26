import {
  ICouponCreateResultApi,
  ICouponGetAllResultApi,
  ICouponSearchResultApi,
} from "@/api-types/ICouponApi";
import IArgsQuery from "@/helpers/IArgsQuery";
import { ICoupon } from "@/interfaces";
import { CONSTANT, getErrorMessage, http } from "@/utils";

class CouponApi {
  async createCoupon(args: Partial<ICoupon>) {
    try {
      const response = await http.post(
        `${CONSTANT.PATH_V1_API.coupon}/create`,
        args
      );
      const result: Omit<
        ICouponCreateResultApi,
        "isCreatingCoupon" | "createCoupon"
      > = response.data();
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllCoupons(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.coupon}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          status: fieldsQuery.status,
          numericFilters: fieldsQuery.numericFilters,
        },
      });
      const result: Omit<ICouponGetAllResultApi, "isGettingCoupons"> =
        response.data();
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getOneCoupon(arg: Pick<ICoupon, "_id">) {
    try {
      const response = await http.get(
        `${CONSTANT.PATH_V1_API.coupon}/getById/${arg._id}`
      );
      const result: Omit<ICouponCreateResultApi, "isGettingCoupon"> =
        response.data();
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchCoupons(fieldsQuery: Partial<IArgsQuery>) {
    try {
      const response = await http.get(`${CONSTANT.PATH_V1_API.coupon}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: Omit<ICouponSearchResultApi, "isSearchingCoupon"> =
        response.data();
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateCoupon(args: Partial<ICoupon>) {
    const { _id: couponId, ...dataUpdate } = args;
    try {
      const response = await http.patch(
        `${CONSTANT.PATH_V1_API.coupon}/update/${couponId}`,
        dataUpdate
      );
      const result: Omit<
        ICouponCreateResultApi,
        "isUpdatingCoupon" | "updateCoupon"
      > = response.data();
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
  
  async deleteCoupon(arg: Pick<ICoupon, "_id">) {
    try {
      const response = await http.delete(
        `${CONSTANT.PATH_V1_API.coupon}/create/${arg._id}`
      );
      const result: Omit<
        ICouponCreateResultApi,
        "isDeletingCoupon" | "deleteCoupon"
      > = response.data();
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new CouponApi();
