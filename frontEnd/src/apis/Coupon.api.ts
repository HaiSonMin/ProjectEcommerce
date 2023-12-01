import { ICoupon } from '@/interfaces/models/coupon.interface';
import { IArgsQuery } from '@/interfaces/shared/IArgsQuery.interface';
import { getErrorMessage, http } from '@/utils';
import { PATH_API_V1 } from '@/constant/path-api';
import { IApi } from '@/interfaces/shared';

class CouponApi {
  async createCoupon(args: Partial<ICoupon>): Promise<IApi> {
    try {
      const response = await http.post(`${PATH_API_V1.coupon}/create`, args);
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllCoupons(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.coupon}/getAll`, {
        params: {
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
          status: fieldsQuery.status,
          numericFilters: fieldsQuery.numericFilters,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getOneCoupon(arg: Pick<ICoupon, '_id'>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.coupon}/getById/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchCoupons(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(`${PATH_API_V1.coupon}/search`, {
        params: {
          keySearch: fieldsQuery.keySearch,
          sort: fieldsQuery.sort,
          page: fieldsQuery.page,
          limit: fieldsQuery.limit,
        },
      });
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateCoupon(args: Partial<ICoupon>): Promise<IApi> {
    const { _id: couponId, ...dataUpdate } = args;
    try {
      const response = await http.patch(
        `${PATH_API_V1.coupon}/update/${couponId}`,
        dataUpdate
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }

  async deleteCoupon(arg: Pick<ICoupon, '_id'>): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.coupon}/delete/${arg._id}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new CouponApi();
