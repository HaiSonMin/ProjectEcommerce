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
  product_promotion: any;
  product_imagesProduct: Array<string>;
  product_imagesAttribute: Array<string>;
  product_brand: IBrand | string; // BrandId
  product_category: IProductCategory | string;
  product_demand: IDemand | string; //Array<RatingId>
  product_ratings: Array<IRating> | Array<string>; //Array<RatingId>
  product_attributes: Array<{
    product_key: string; // Color, Size, DiskSpace
    product_price: number;
    product_color: Array<any>;
    product_description: string;
  }>;
  product_specification: ISpecification;
}
