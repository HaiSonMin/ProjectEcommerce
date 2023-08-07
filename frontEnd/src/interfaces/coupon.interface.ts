export default interface ICoupon {
  _id: string | undefined;
  coupon_name: string;
  coupon_type: string;
  coupon_code: string;
  coupon_value: number; // unit || %
  coupon_appliesAll: boolean; // unit || %
  coupon_applicableProducts: Array<string>; // Only applies to selected products only
  coupon_applicableProductCategories: Array<string>; // Only applies to selected products only
  coupon_minimumOrderValue: number;
  coupon_numberOfApplication: number;
  coupon_startDate: string;
  coupon_endDate: string;
}
