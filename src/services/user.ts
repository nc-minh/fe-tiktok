import { AxiosResponse } from 'axios';

import axiosInstance from 'utils/api/axiosInstance';

export const getUserInfo = async () => {
  const response: AxiosResponse = await axiosInstance.get('/users/info');

  return response?.data?.data;
};

export const getUserByUsername = async (username: string) => {
  const response: AxiosResponse = await axiosInstance.get(
    `/users/info/${username}`,
  );

  return response?.data?.data;
};
