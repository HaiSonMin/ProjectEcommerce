import ProductCategoryType from "./IProductCategoryType";

export default interface IRatingType {
  _id: string;
  rating_point: number;
  rating_product: string | ProductCategoryType;
  rating_description: string;
  rating_response: string;
  // rating_user: string
  // rating_responseAdmin:
}
