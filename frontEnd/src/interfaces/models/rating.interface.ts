import { IUser } from './user.interface';

export default interface IRating {
  _id: string;
  rating_point: number;
  rating_product: string;
  rating_user: string | IUser;
  rating_description: string;
  rating_response: string;
  rating_responseBy: string | IUser;
}
