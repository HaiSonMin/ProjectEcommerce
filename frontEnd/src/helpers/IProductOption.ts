export default interface IProductOption {
  id: string;
  product_optionName: string;
  product_priceDifference: number;
  product_serials: Array<{
    id: string;
    product_serialName: string;
    product_serialImage: string;
    product_priceDifference: Number;
  }>;
  product_description: string;
  product_specification: string;
}
