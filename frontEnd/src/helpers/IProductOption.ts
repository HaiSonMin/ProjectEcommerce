export default interface IProductOption {
  id: string;
  product_optionName: string;
  product_priceDifference: number;
  product_serials?: Array<{
    id: string;
    serialName: string;
    serialImage: any;
    serialPriceDifference: number;
  }>;
  product_description: string;
  product_specificationMain: Array<{
    id: string;
    specKey: string;
    specValue: string;
  }>;
  product_specificationDetail: string;
}
