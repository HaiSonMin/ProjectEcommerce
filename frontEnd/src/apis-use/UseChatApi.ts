import {
  IChatCreateResultApi,
  IChatGetOneResultApi,
  IChatGetAllResultApi,
  IChatSearchResultApi,
  IChatUpdateResultApi,
  IChatDeleteResultApi,
} from '@/interfaces/result-apis/IChatResultApi';
import { ChatApi } from '@/apis';
import { toast } from 'react-hot-toast';
import { getQueriesString } from '@/utils';
import { useQueriesString } from '@/hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default class UseChatApi {
  static createChat(): IChatCreateResultApi {
    const queryClient = useQueryClient();
    const { data, mutate, isLoading } = useMutation({
      mutationFn: ChatApi.createChat,
      onSuccess: (data: any) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ['Chats'] });
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      createChat: mutate,
      isCreatingChat: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getOneChat(): IChatGetOneResultApi {
    const { chatId } = useParams();
    const { data, isLoading } = useQuery({
      queryKey: ['chat'],
      queryFn: () => ChatApi.getById({ _id: chatId + '' }),
    });
    return {
      isGettingChat: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static getAllChats(): IChatGetAllResultApi {
    const queryClient = useQueryClient();
    const {
      limit,
      keySearch,
      page: currentPage,
    } = getQueriesString(useQueriesString());
    const { data, isLoading } = useQuery({
      queryKey: ['Chats', currentPage, keySearch],
      queryFn: () =>
        ChatApi.getAllChats({
          keySearch,
          page: currentPage,
          limit,
        }),
    });
    let numberPage: number = 1;
    if (data?.metadata?.Chats)
      numberPage = Math.ceil(data?.metadata?.Chats / limit);
    // Get Data Next Page
    if (currentPage < numberPage)
      queryClient.prefetchQuery({
        queryKey: ['chats', currentPage + 1, keySearch],
        queryFn: () =>
          ChatApi.getAllChats({
            keySearch,
            page: currentPage + 1,
            limit,
          }),
      });

    // Get Data Next Page
    if (currentPage > 1)
      queryClient.prefetchQuery({
        queryKey: ['chats', currentPage - 1, keySearch],
        queryFn: () =>
          ChatApi.getAllChats({
            keySearch,
            page: currentPage - 1,
            limit,
          }),
      });

    return {
      isGettingChats: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static updateChat(): IChatUpdateResultApi {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation({
      mutationFn: ChatApi.updateChat,
      onSuccess: (data) => {
        toast.success(data.message || 'Update Chat successfully');
        queryClient.invalidateQueries({
          queryKey: ['chats'],
        });
      },
    });

    return {
      updateChat: mutate,
      isUpdatingChat: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }

  static deleteChat(): IChatDeleteResultApi {
    const queryClient = useQueryClient();
    const { mutate, isLoading, data } = useMutation({
      mutationFn: ChatApi.deleteChat,
      onSuccess: () => {
        toast.success('Delete Chat Successfully');
        queryClient.invalidateQueries({
          queryKey: ['chats'],
        });
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    });

    return {
      deleteChat: mutate,
      isDeletingChat: isLoading,
      message: data?.message,
      metadata: data?.metadata,
      statusCode: data?.statusCode,
      reasonStatusCode: data?.reasonStatusCode,
    };
  }
}
