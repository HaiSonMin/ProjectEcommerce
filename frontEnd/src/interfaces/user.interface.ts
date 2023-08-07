export default interface IUser {
  _id: string | undefined;
  user_firstName: string;
  user_lastName: string;
  user_userName: string;
  user_phoneNumber: string;
  user_email: string;
  user_role: string;
  user_isBlocking: boolean;
}

export interface IUserCreate extends IUser {
  user_password: string;
  reconfirmPassword: string;
}
