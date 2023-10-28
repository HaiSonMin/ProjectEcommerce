export default interface ILocalStoreCart {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
