export interface IDiscount {
    _id: string | undefined;
    discount_name: string;
    discount_type: string;
    discount_code: string;
    discount_value: number;
    discount_productIds: Array<string>;
    discount_startDate: string;
    discount_endDate: string;
  }
  