import IProductCategory from "./productCategory.interface";

export default interface IDemand {
  _id: string;
  demand_name: string;
  demand_image: string;
  demand_productCategory: string | IProductCategory;
}
