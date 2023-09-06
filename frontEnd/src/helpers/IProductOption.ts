export default interface IProductOption {
  id: string;
  product_optionName: string;
  product_priceDifference: number;
  product_serials?: Array<{
    id: string;
    product_serialName: string;
    product_serialImage: any;
    product_priceDifference: Number;
  }>;
  product_description: string;
  //   {
  //      "key":"value"
  //      "key":"value"
  //      "key":"value"
  //   }
  product_specificationMain: any;
  product_specificationDetail: string;
}
