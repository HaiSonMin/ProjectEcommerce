import { IChat, IChatContent, IChatUser } from '@/interfaces/models';
import { IArgsQuery } from '@/interfaces/shared/IArgsQuery.interface';
import { http, getErrorMessage } from '@/utils';
import { PATH_API_V1 } from '@/constant/path-api';
import { IApi } from '@/interfaces/shared';

class ChatApi {
  async createChat(args: IChatUser): Promise<IApi> {
    try {
      const response = await http.post(
        `${PATH_API_V1.chat.root}/${PATH_API_V1.chat.feature.createChat}`,
        args
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getById({ _id: chatId }: Pick<IChat, '_id'>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.chat.root}/${PATH_API_V1.chat.feature.getByIdChat}/${chatId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async getAllChats(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.chat.root}/${PATH_API_V1.chat.feature.getAllChats}`,
        {
          params: {
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
          },
        }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async searchChats(fieldsQuery: Partial<IArgsQuery>): Promise<IApi> {
    try {
      const response = await http.get(
        `${PATH_API_V1.chat.root}/${PATH_API_V1.chat.feature.searchChat}`,
        {
          params: {
            keySearch: fieldsQuery.keySearch,
            page: fieldsQuery.page,
            limit: fieldsQuery.limit,
          },
        }
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }

  async updateChat(args: Pick<IChat, '_id'> & IChatContent): Promise<IApi> {
    const response = await http.patch(
      `${PATH_API_V1.chat.root}/${PATH_API_V1.chat.feature.updateByIdChat}/${args._id}`,
      args
    );
    const result: IApi = response.data;
    return result;
  }

  async deleteChat({ _id: chatId }: Pick<IChat, '_id'>): Promise<IApi> {
    try {
      const response = await http.delete(
        `${PATH_API_V1.chat.root}/${PATH_API_V1.chat.feature.deleteByIdChat}/${chatId}`
      );
      const result: IApi = response.data;
      return result;
    } catch (error: any) {
      throw new Error(getErrorMessage(error));
    }
  }
}

export default new ChatApi();
