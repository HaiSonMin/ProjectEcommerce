export interface ILocalStoreCart {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
