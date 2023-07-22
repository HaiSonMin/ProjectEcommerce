import { IBrandType, IProductCategoryType, IRatingType } from ".";

export interface IProductSpecification {
  _id: string;
  specification_productId: string;
  specification_processor: Array<string>;
  specification_graphic: Array<string>;
  specification_communication: Array<string>;
  specification_rearCamera: Array<string>;
  specification_frontCamera: Array<string>;
  specification_design: Array<string>;
  specification_weight: string;
  specification_releaseTime: string | Date;
  specification_chargingTechnology: Array<string>;
  specification_otherParameter: Array<string>;
  specification_otherUtilities: Array<string>;
}

export interface IProductMainInfoType {
  _id: string;
  product_productId: string;
  product_rom: string;
  product_ram: string;
  product_color: string;
  product_price: number | string;
  product_priceAppliedDiscount?: number | string;
  product_quantity: number | string;
  product_sold?: number | string;
  product_imageColor: string;
  product_colorCode: string;
  product_description?: any;
  product_specification?: IProductSpecification; // SpecificationId
}

export default interface IProductType {
  _id?: string;
  product_name: string;
  product_price: number;
  product_slugify: string;
  product_thumb: string;
  product_images: Array<string>;
  product_brand: IBrandType | string; // BrandId
  product_category: IProductCategoryType | string; // CategoryId
  product_ratings?: Array<IRatingType> | Array<string>; //Array<RatingId>
  product_mainInfo: Array<IProductMainInfoType>; // MainInfoId
  brand?: IBrandType;
  category?: IProductCategoryType;
  productMainInfo?: IProductMainInfoType;
}

export interface IProductCreateType
  extends Omit<
      IProductType,
      | "_id"
      | "product_slugify"
      | "product_ratings"
      | "product_mainInfo"
      | "brand"
      | "category"
      | "productMainInfo"
      | "product_price"
    >,
    Omit<
      IProductMainInfoType,
      | "_id"
      | "product_productId"
      | "product_priceAppliedDiscount"
      | "product_specification"
    > {}

export interface IProductUpdateBasicType
  extends Pick<
    IProductType,
    | "_id"
    | "product_thumb"
    | "product_name"
    | "product_images"
    | "product_brand"
    | "product_category"
  > {}
