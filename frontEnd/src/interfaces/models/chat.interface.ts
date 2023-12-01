import { IUser } from './user.interface';

export interface IChatUser {
  chat_userName: string;
  chat_userEmail: string;
  chat_userPhone: string;
  chat_userSex: string;
}

export interface IChatContent {
  chat_userEmail: string;
  chat_userMessage: string;
}

export interface IChat {
  _id: string;
  chat_user: IChatUser;
  chat_admin: string | IUser;
  chat_contents: IChatContent;
}
