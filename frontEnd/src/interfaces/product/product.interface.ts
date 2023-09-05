import { IProductOption } from "@/helpers";
import { IBrand, IDemand, IProductCategory, IRating } from "..";
import ISpecification from "./specification";

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
  product_brand: IBrand | string; // BrandId
  product_category: IProductCategory | string;
  product_demands: Array<IDemand> | Array<string>;
  product_ratings: Array<IRating> | Array<string>;
  product_options: Array<IProductOption>;
  product_optionFilters: any;
}
