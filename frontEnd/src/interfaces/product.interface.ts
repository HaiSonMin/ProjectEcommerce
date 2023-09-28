import { IFilterOption, IProductOption } from "@/helpers";
import { IBrand, IDemand, IProductCategory, IRating } from ".";

export default interface IProduct {
  _id: string;
  product_name: string;
  product_thumb: string;
  product_price: number;
  product_priceAppliedDiscount: number;
  product_slugify: string;
  product_available: String;
  product_promotion: string;
  product_imagesProduct: Array<string>;
  product_imagesHighlights: Array<string>;
  product_brand: IBrand; // BrandId
  product_category: IProductCategory;
  product_demands: Array<IDemand>;
  product_ratings: Array<IRating>;
  product_options: Array<IProductOption>;
  product_optionFilters: Array<IFilterOption>;
}
