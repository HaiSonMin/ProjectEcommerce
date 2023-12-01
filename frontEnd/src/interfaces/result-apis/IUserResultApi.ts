import { IUser } from '@/interfaces/models/user.interface';
import { IApi } from '@/interfaces/shared';
import { UseMutateFunction } from '@tanstack/react-query';

export interface IAdminGetOneUserResultApi extends IApi {
  isGettingUser: boolean;
  metadata: IUser | undefined;
}

export interface IUserUpdateResultApi extends IApi {
  isUpdating: boolean;
  metadata: IUser;
  updateUser: UseMutateFunction<any, unknown, Partial<IUser>>;
}
