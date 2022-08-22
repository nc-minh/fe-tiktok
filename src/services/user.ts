import { AxiosResponse } from 'axios';
import { UpdateUserType, UserInfo } from 'types/User';

import axiosInstance from 'utils/api/axiosInstance';

export const getUserInfo = async (): Promise<UserInfo> => {
  const response: AxiosResponse = await axiosInstance.get('/users/info');

  return response?.data?.data;
};

export const getUserByUsername = async (
  username: string,
): Promise<UserInfo> => {
  const response: AxiosResponse = await axiosInstance.get(
    `/users/info/${username}`,
  );

  return response?.data?.data;
};

export const updateUser = async ({
  fullname,
  username,
  avatar,
  bio,
  website_url,
  social_network,
}: UpdateUserType): Promise<UpdateUserType> => {
  const response: AxiosResponse = await axiosInstance.patch('/users/update', {
    fullname,
    username,
    avatar,
    bio,
    website_url,
    social_network,
  });

  return response?.data?.data;
};

export const updateAvatar = async (
  avatar: FormData,
): Promise<UpdateUserType> => {
  const response: AxiosResponse = await axiosInstance.patch(
    '/users/avatar',
    avatar,
  );

  return response?.data?.data;
};

export const getSuggestedAccounts = async (
  pageSize: number,
  currentPage: number,
) => {
  const response: AxiosResponse = await axiosInstance.get(
    `/users/suggested-accounts`,
    {
      params: {
        pageSize: pageSize,
        currentPage: currentPage,
      },
    },
  );
  return response?.data?.data;
};
