import { IBrand } from './brand.interface';
import { IDemand } from './demand.interface';
import IRating from './rating.interface';
import { IFilterOption, IProductOption } from '@/interfaces/shared';
import {IProductCategory} from './productCategory.interface';

export interface IProduct {
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
  product_optionFilters: Array<IFilterOption>;
}

export interface IProductCard {
  _id: string;
  product_name: string;
  product_thumb: string;
  product_price: number;
  product_priceAppliedDiscount: number;
  product_promotion: string;
  product_ratings: Array<IRating> | Array<string>;
}
