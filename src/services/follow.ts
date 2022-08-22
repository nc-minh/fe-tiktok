import { AxiosResponse } from 'axios';
import { FollowType } from 'types/Follow';

import axiosInstance from 'utils/api/axiosInstance';

export const follow = async (payload: FollowType) => {
  const response: AxiosResponse = await axiosInstance.post('/follows', payload);

  if (
    String(response?.data?.status).startsWith('4') ||
    String(response?.data?.status).startsWith('5')
  ) {
    throw response?.data;
  }
  return response?.data?.data;
};

export const getFollowings = async (
  user_id: string,
  pageSize: number,
  currentPage: number,
) => {
  const response: AxiosResponse = await axiosInstance.get(
    `/follows/followings/${user_id}`,
    {
      params: {
        pageSize,
        currentPage,
      },
    },
  );
  return response?.data?.data;
};
