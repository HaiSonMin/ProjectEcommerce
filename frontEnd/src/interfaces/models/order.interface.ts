import IUser from "./user.interface";

export default interface IOrder {
  _id: string | undefined;
  order_status: string;
  order_byUser: IUser | string;
  order_totalAmount: number;
  order_paymentIntent: string;
  order_createdAt: string | Date;
  order_updateAd: string | Date;
}
