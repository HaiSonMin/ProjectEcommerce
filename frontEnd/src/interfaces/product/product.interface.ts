import { IBrand, IProductCategory, IRating } from "..";
import ISpecification from "./specification";

export default interface IProduct {
  _id?: string;
  product_name: string;
  product_origin: string;
  product_price: number;
  product_priceAppliedDiscount: number;
  product_slugify: string;
  product_thumb: string;
  product_available?: String;
  product_imagesProduct: Array<string>;
  product_imagesAttribute: Array<string>;
  product_promotion?: any;
  product_brand: IBrand | string; // BrandId
  product_category: IProductCategory | string; 
  product_ratings?: Array<IRating> | Array<string>; //Array<RatingId>
  product_attributes: Array<{
    product_key: string; // Color, Size, DiskSpace
    product_imageColor: string;
    product_price: number;
    product_priceAppliedDiscount?: number;
    product_specification: ISpecification;
    product_description: string;
  }>;
}
