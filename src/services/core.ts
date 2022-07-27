import { AxiosResponse } from 'axios';

import axiosInstance from 'utils/api/axiosInstance';

export const createUser = async (payload: any) => {
  const response: AxiosResponse = await axiosInstance.post(
    '/auth/login',
    payload,
  );
  return response?.data;
};

export const getUsers = async () => {
  const response: AxiosResponse = await axiosInstance.post('/users');
  return response.data;
};
