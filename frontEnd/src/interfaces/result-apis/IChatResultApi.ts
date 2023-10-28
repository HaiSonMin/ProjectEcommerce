import { UseMutateFunction } from '@tanstack/react-query';
import IApi from '@/interfaces/shared/IApi.interface';
import {
  IChat,
  IChatContent,
  IChatUser,
} from '@/interfaces/models/chat.interface';
import IUser from '../models/user.interface';

/**
 *  ------- available -------
 *  message
 *  metadata
 *  reasonStatusCode
 *  statusCode
 *  ------- optional(customer) -------
 *  isGetting
 *  isCreating
 *  isUpdating
 *  isDeleting
 *  create
 *  update
 *  delete
 */

export interface IChatGetOneResultApi extends IApi {
  isGettingChat: boolean;
  metadata: IChat;
}

export interface IChatGetAllResultApi extends IApi {
  isGettingChats: boolean;
  metadata:
    | {
        totalChats: number;
        ChatsPerPage: number;
        Chats: Array<IChat>;
      }
    | undefined;
}

export interface IChatSearchResultApi
  extends Omit<IChatGetAllResultApi, 'isGettingChats'> {
  isSearchingChats: boolean;
}

export interface IChatCreateResultApi extends IApi {
  isCreatingChat: boolean;
  metadata: IChat | undefined;
  createChat: UseMutateFunction<IApi, any, IChatUser>;
}

export interface IChatUpdateResultApi extends IApi {
  isUpdatingChat: boolean;
  metadata: IChat | undefined;
  updateChat: UseMutateFunction<IApi, any, Pick<IChat, '_id'> & IChatContent>;
}

export interface IChatDeleteResultApi extends IApi {
  isDeletingChat: boolean;
  metadata: IChat | undefined;
  deleteChat: UseMutateFunction<IApi, any, Pick<IChat, '_id'>>;
}
