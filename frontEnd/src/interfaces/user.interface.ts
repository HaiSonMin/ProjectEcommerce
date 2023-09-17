export default interface IUser {
  _id: string;
  user_firstName: string;
  user_lastName: string;
  user_userName: string;
  user_phoneNumber: string;
  user_email: string;
  user_role: string;
  user_isBlocking: boolean;
  user_password: string;
  user_promoCode: string;
}

export interface IUserCreate extends IUser {
  reconfirmPassword: string;
}
